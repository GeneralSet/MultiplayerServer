use actix::prelude::*;
use std::collections::{HashMap};
use serde_json::{Result as JSON_Result};
use serde::{Deserialize, Serialize};
use redis::{PubSubCommands, Commands, ControlFlow};
use set::Set;
use std::thread;
use std::time::Duration;

/// Server sends this messages to session
#[derive(Message)]
pub struct Message(pub String);

#[derive(Serialize, Deserialize)]
pub struct ClientUser {
    name: String,
    points: isize,
}

#[derive(Serialize, Deserialize)]
pub struct UserMessage {
    eventType: String,
    users: Vec<ClientUser>
}

#[derive(Serialize, Deserialize)]
pub struct GameTypeMessage {
    eventType: String,
    gameType: String,
}

#[derive(Serialize, Deserialize)]
pub struct GameUpdateMessage {
    eventType: String,
    gameState: Game,
}

#[derive(Serialize, Deserialize)]
pub struct User {
    name: String,
    points: isize,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Selection {
    user: String,
    valid: bool,
    selection: String,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Game {
    numberOfSets: usize,
    deck: String,
    board: String,
    previousSelection: Option<Selection>
}

#[derive(Serialize, Deserialize)]
pub struct Lobby {
    users: HashMap<usize, User>,
    game_type: Option<String>,
    game_state: Option<Game>,
}

/// `Server` manages rooms and responsible for coordinating game
/// sessions. implementation is super primitive
pub struct Server {
    sessions: HashMap<usize, Recipient<Message>>,
    redis: redis::Client
}

impl Default for Server {
    fn default() -> Server {
        Server {
            sessions: HashMap::new(),
            redis:  redis::Client::open("redis://redis:6379").unwrap(),
        }
    }
}

/// Make actor from `Server`
impl Actor for Server {
    /// We are going to use simple Context, we just need ability to communicate
    /// with other actors.
    type Context = Context<Self>;
}

#[allow(unused_must_use)]
impl Server {
    fn subscribe(
        &mut self,
        channel: String,
        addr: Addr<Server>
    ) -> () {
        let client = self.redis.clone();

        thread::spawn(move || {
            let mut conn = client.get_connection().unwrap();
            conn.subscribe(&[channel], |msg| {
                let ch = msg.get_channel_name();
                let payload: String = msg.get_payload().unwrap();
                match payload.as_ref() {
                    "exit" => ControlFlow::Break(()),
                    "user" => {
                        addr.do_send(EmitUsers { room_name: ch.to_string(),});
                        ControlFlow::Continue
                    },
                    "game_type" => {
                        error!("emit gameType update here");
                        addr.do_send(EmitGameType {
                            room_name: ch.to_string(),
                        });
                        ControlFlow::Continue
                    },
                    "game_state" => {
                        error!("emit gameState update here");
                        addr.do_send(EmitGameState {
                            room_name: ch.to_string(),
                        });
                        ControlFlow::Continue
                    },
                    a => {
                        panic!("Channel '{}' received '{}'.", ch, a);
                    }
                }
            }).unwrap();
        });
    }
}


/// Join room, if room does not exists create new one.
#[derive(Message)]
pub struct Join {
    pub id: usize,
    pub addr: Recipient<Message>,
    pub username: String,
    pub room_name: String,
}

// Join room, send disconnect message to old room
/// send join message to new room
impl Handler<Join> for Server {
    type Result = ();

    fn handle(&mut self, msg: Join, ctx: &mut Context<Self>) {
        let Join { id, addr, username, room_name } = msg;

        // add refrence to user addr to server session
        self.sessions.insert(id, addr);

        // get/create lobby
        let con = self.redis.get_connection().unwrap();
        let existing_lobby: redis::RedisResult<String> = con.get(&room_name);
        let mut new_lobby: Lobby = match existing_lobby {
            Ok(l) => {
                serde_json::from_str(&l).unwrap()
            },
            _ => Lobby {
                users: HashMap::new(),
                game_type: None,
                game_state: None
            }
        };

        // add new user to lobby
        new_lobby.users.insert(
            id,
            User {
                name: username,
                points: 0
            }
        );
        let lobby_json = serde_json::to_string(&new_lobby).unwrap();
        let _: () = con.set(&room_name, lobby_json).unwrap();

        // add user to redis channel
        let handle = self.subscribe(room_name.clone(), ctx.address());
        // TODO fix so publish happens after successfully subscribed
        thread::sleep(Duration::from_millis(5));
        // publish updated state of the lobby to redis channel
        let _: () = con.publish(room_name.clone(), "user").unwrap();
    }
}


#[derive(Message)]
pub struct SetGameType {
    pub game_type: String,
    pub room_name: String,
}

// Set game type, and broadcast that type to all clients in the room
impl Handler<SetGameType> for Server {
    type Result = ();

    fn handle(&mut self, msg: SetGameType, _: &mut Context<Self>) {
        let SetGameType { game_type, room_name } = msg;

        // get lobby
        let con = self.redis.get_connection().unwrap();
        let existing_lobby: redis::RedisResult<String> = con.get(&room_name);
        let mut new_lobby: Lobby = match existing_lobby {
            Ok(l) => {
                serde_json::from_str(&l).unwrap()
            },
            _ => panic!("requested lobby does not exist")
        };

        // update lobby with new game type
        new_lobby.game_type = Some(game_type.clone());
        let lobby_json = serde_json::to_string(&new_lobby).unwrap();
        let _: () = con.set(&room_name, lobby_json).unwrap();

        // publish game type update
        let _: () = con.publish(room_name.clone(), "game_type").unwrap();
    }
}


#[derive(Message)]
pub struct StartGame {
    pub room_name: String,
}

// Set game type, and broadcast that type to all clients in the room
impl Handler<StartGame> for Server {
    type Result = ();

    fn handle(&mut self, msg: StartGame, _: &mut Context<Self>) {
        let StartGame { room_name } = msg;

        // get lobby
        let con = self.redis.get_connection().unwrap();
        let existing_lobby: redis::RedisResult<String> = con.get(&room_name);
        let mut new_lobby: Lobby = match existing_lobby {
            Ok(l) => {
                serde_json::from_str(&l).unwrap()
            },
            _ => panic!("requested lobby does not exist")
        };

        // init game state
        let set = Set::new(4, 3);
        let deck = set.init_deck();
        let update_board = set.update_board(deck, "".to_string());
        let game_state = Game {
            deck: update_board.get_deck(),
            board: update_board.get_board(),
            numberOfSets: update_board.sets,
            previousSelection: None
        };


        // update lobby with new game state
        new_lobby.game_state = Some(game_state.clone());
        let lobby_json = serde_json::to_string(&new_lobby).unwrap();
        let _: () = con.set(&room_name, lobby_json).unwrap();

        // publish game update to redis channel
        let _: () = con.publish(room_name.clone(), "game_state").unwrap();
    }
}


#[derive(Message)]
pub struct VerifySet {
    pub id: usize,
    pub room_name: String,
    pub selected: String,
}

// Set game type, and broadcast that type to all clients in the room
impl Handler<VerifySet> for Server {
    type Result = ();

    fn handle(&mut self, msg: VerifySet, _: &mut Context<Self>) {
        let VerifySet { id, room_name, selected } = msg;
        
        // get lobby
        let con = self.redis.get_connection().unwrap();
        let existing_lobby: redis::RedisResult<String> = con.get(&room_name);
        let mut new_lobby: Lobby = match existing_lobby {
            Ok(l) => {
                serde_json::from_str(&l).unwrap()
            },
            _ => panic!("requested lobby does not exist")
        };

        // check if selected cards are a set
        let set = Set::new(4, 3);
        let is_valid_set = set.is_set(selected.clone());
        if is_valid_set {
            // add a point to the user who selected the set
            {
                let user = new_lobby.users.get_mut(&id).unwrap();
                user.points = user.points + 1;
            }

            // get current game state
            let name = new_lobby.users.get(&id).unwrap().name.to_string();
            let old_board = new_lobby.game_state.as_ref().unwrap().board.to_string();
            let deck = new_lobby.game_state.as_ref().unwrap().deck.to_string();

            // remove selected cards from the board
            let mut board: Vec<&str> = old_board.split(",").collect();
            for card in selected.split(",") {
                board.remove_item(&card);
            }

            // create updated game state
            let set = Set::new(4, 3);
            let update_board = set.update_board(deck, board.join(","));
            let game_state = Game {
                deck: update_board.get_deck(),
                board: update_board.get_board(),
                numberOfSets: update_board.sets,
                previousSelection: Some(Selection{
                    user: name,
                    valid: true,
                    selection: selected.to_string(),
                }),
            };

            // update lobby with new game state
            new_lobby.game_state = Some(game_state.clone());
            let lobby_json = serde_json::to_string(&new_lobby).unwrap();
            let _: () = con.set(&room_name, lobby_json).unwrap();

            // publish game and user update to redis channel
            let _: () = con.publish(room_name.clone(), "user").unwrap();
            let _: () = con.publish(room_name.clone(), "game_state").unwrap();
        } else {
            // subtract a point to the user who selected the set
            {
                let user = new_lobby.users.get_mut(&id).unwrap();
                user.points = user.points - 1;
            }

            // create previous selection
            let name = new_lobby.users.get(&id).unwrap().name.to_string();
            let previousSelection = Some(Selection{
                user: name,
                valid: false,
                selection: selected.to_string(),
            });

            // update lobby with new previous selection
            new_lobby.game_state.as_mut().unwrap().previousSelection = previousSelection;
            let lobby_json = serde_json::to_string(&new_lobby).unwrap();
            let _: () = con.set(&room_name, lobby_json).unwrap();

            // publish game and user update to redis channel
            let _: () = con.publish(room_name.clone(), "user").unwrap();
            let _: () = con.publish(room_name.clone(), "game_state").unwrap();
        }
    }
}

/// EmitUsers room, if room does not exists create new one.
#[derive(Message)]
pub struct EmitUsers {
    room_name: String,
}

impl Handler<EmitUsers> for Server {
    type Result = ();

    fn handle(&mut self, msg: EmitUsers, _: &mut Context<Self>) {
        let EmitUsers { room_name } = msg;
  
        let con = self.redis.get_connection().unwrap();
        let l: String = con.get(&room_name).unwrap();
        let lobby: Lobby = serde_json::from_str(&l).unwrap();

        let mut message = UserMessage {
            eventType: "users".to_string(),
            users: Vec::new(),
        };

        for user in lobby.users.values() {
            message.users.push(
                ClientUser {
                    name: user.name.clone(),
                    points: user.points.clone(),
                }
            )
        }

        let message_string = serde_json::to_string(&message).unwrap();
        for (id, _user) in lobby.users {
            match self.sessions.get(&id) {
                Some(addr) => addr.do_send(Message(message_string.to_owned())),
                None => Ok(()) // user is not connected to this server
            };
        }
    }
}

#[derive(Message)]
pub struct EmitGameType {
    room_name: String,
}

impl Handler<EmitGameType> for Server {
    type Result = ();

    fn handle(&mut self, msg: EmitGameType, _: &mut Context<Self>) {
        let EmitGameType { room_name } = msg;

        let con = self.redis.get_connection().unwrap();
        let l: String = con.get(&room_name).unwrap();
        let lobby: Lobby = serde_json::from_str(&l).unwrap();

        let message = GameTypeMessage {
            eventType: "setGameType".to_string(),
            gameType: lobby.game_type.unwrap(),
        };

        let message_string = serde_json::to_string(&message).unwrap();
        for (id, _user) in lobby.users {
            match self.sessions.get(&id) {
                Some(addr) => addr.do_send(Message(message_string.to_owned())),
                None => Ok(()) // user is not connected to this server
            };
        }
    }
}

#[derive(Message)]
pub struct EmitGameState {
    room_name: String,
}

impl Handler<EmitGameState> for Server {
    type Result = ();

    fn handle(&mut self, msg: EmitGameState, _: &mut Context<Self>) {
        let EmitGameState { room_name } = msg;

        let con = self.redis.get_connection().unwrap();
        let l: String = con.get(&room_name).unwrap();
        let lobby: Lobby = serde_json::from_str(&l).unwrap();

        let message = GameUpdateMessage {
            eventType: "updateGame".to_string(),
            gameState: lobby.game_state.unwrap(),
        };

        let message_string = serde_json::to_string(&message).unwrap();
        for (id, _user) in lobby.users {
            match self.sessions.get(&id) {
                Some(addr) => addr.do_send(Message(message_string.to_owned())),
                None => Ok(()) // user is not connected to this server
            };
        }
    }
}