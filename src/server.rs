//! `Server` is an actor. It maintains list of connection client session.
//! And manages game state for each room.

use actix::prelude::*;
use rand::{self, rngs::ThreadRng, Rng};
use std::collections::{HashMap, HashSet};
use serde_json::{Result as JSON_Result};
use serde::{Deserialize, Serialize};
use set::Set;

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

pub struct User {
    addr: Recipient<Message>,
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

pub struct Lobby {
    users: HashMap<usize, User>,
    game_type: Option<String>,
    game_state: Option<Game>,
}

/// `Server` manages rooms and responsible for coordinating game
/// sessions. implementation is super primitive
pub struct Server {
    sessions: HashMap<String, Lobby>,
    rng: ThreadRng,
}

impl Default for Server {
    fn default() -> Server {
        Server {
            sessions: HashMap::new(),
            rng: rand::thread_rng(),
        }
    }
}

/// Make actor from `Server`
impl Actor for Server {
    /// We are going to use simple Context, we just need ability to communicate
    /// with other actors.
    type Context = Context<Self>;
}


impl Server {
    fn emit_users(&mut self, room_name: &String, skip_id: usize) {
        if let Some(session) = self.sessions.get_mut(room_name) {

            let mut message = UserMessage {
                eventType: "users".to_string(),
                users: Vec::new(),
            };
            for user in session.users.values() {
                message.users.push(
                    ClientUser {
                        name: user.name.clone(),
                        points: user.points.clone(),
                    }
                )
            }
            let message_string = match serde_json::to_string(&message) {
                JSON_Result::Ok(u) => u,
                _ => panic!("Not able to serialize users")
            };

            for (id, user) in &session.users {
                // TODO continue if skip_id == user key
                user.addr.do_send(Message(message_string.to_owned()));
            }
        }
    }

    fn emit_game_type(&mut self, room_name: &String) {
        let session = self.sessions.get(room_name).unwrap();
        let game_type = session.game_type.as_ref().unwrap();
        let message = GameTypeMessage {
            eventType: "setGameType".to_string(),
            gameType: game_type.to_string(),
        };
        let message_string = match serde_json::to_string(&message) {
            JSON_Result::Ok(u) => u,
            _ => panic!("Not able to serialize users")
        };
        for (id, user) in &session.users {
            // TODO continue if skip_id == user key
            user.addr.do_send(Message(message_string.to_owned()));
        }
    }

    fn emit_game_update(&mut self, room_name: &String) {
        let session = self.sessions.get(room_name).unwrap();
        let game_state = session.game_state.as_ref().unwrap();

        let message = GameUpdateMessage {
            eventType: "updateGame".to_string(),
            gameState: game_state.clone(),
        };
        let message_string = match serde_json::to_string(&message) {
            JSON_Result::Ok(u) => u,
            _ => panic!("Not able to serialize users")
        };
        for (id, user) in &session.users {
            // TODO continue if skip_id == user key
            user.addr.do_send(Message(message_string.to_owned()));
        }
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

    fn handle(&mut self, msg: Join, _: &mut Context<Self>) {
        let Join { id, addr, username, room_name } = msg;

        if self.sessions.get_mut(&room_name).is_none() {
            self.sessions.insert(
                room_name.clone(),
                Lobby {
                    users: HashMap::new(),
                    game_type: None,
                    game_state: None,
                }
            );
        }

        self.sessions.get_mut(&room_name).unwrap().users.insert(
            id,
            User {
                addr: addr,
                name: username,
                points: 0,
            }
        );
        self.emit_users(&room_name, id);
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

        if self.sessions.get_mut(&room_name).is_none() {
            return
        }

        self.sessions.get_mut(&room_name).unwrap().game_type = Some(game_type.clone());
        self.emit_game_type(&room_name);
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

        if self.sessions.get_mut(&room_name).is_none() {
            return
        }

        let set = Set::new(4, 3);
        let deck = set.init_deck();
        let update_board = set.update_board(deck, "".to_string());
        let game_state = Game {
            deck: update_board.get_deck(),
            board: update_board.get_board(),
            numberOfSets: update_board.sets,
            previousSelection: None
        };
        self.sessions.get_mut(&room_name).unwrap().game_state = Some(game_state);

        self.emit_game_update(&room_name);
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
        
        if self.sessions.get_mut(&room_name).is_none() {
            return
        }
        
        let set = Set::new(4, 3);
        let is_valid_set = set.is_set(selected.clone());
        if is_valid_set {
            {
                let user = self.sessions.get_mut(&room_name).unwrap()
                            .users.get_mut(&id).unwrap();
                user.points = user.points + 1;
            }

            self.emit_users(&room_name, id);

            let name = self.sessions.get(&room_name).unwrap().users.get(&id).unwrap().name.to_string();

            let old_board = self.sessions.get(&room_name).unwrap().game_state.as_ref().unwrap().board.to_string();
            let deck  = self.sessions.get(&room_name).unwrap().game_state.as_ref().unwrap().deck.to_string();

            let mut board: Vec<&str> = old_board.split(",").collect();
            for card in selected.split(",") {
                board.remove_item(&card);
            }

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

            self.sessions.get_mut(&room_name).unwrap().game_state = Some(game_state);

            self.emit_game_update(&room_name);
        } else {
            {
                let user = self.sessions.get_mut(&room_name).unwrap()
                            .users.get_mut(&id).unwrap();
                user.points = user.points - 1;
            }

            self.emit_users(&room_name, id);

            let name = self.sessions.get(&room_name).unwrap().users.get(&id).unwrap().name.to_string();

            let previousSelection = Some(Selection{
                user: name,
                valid: false,
                selection: selected,
            });

            self.sessions.get_mut(&room_name).unwrap().game_state.as_mut().unwrap().previousSelection = previousSelection;

            self.emit_game_update(&room_name);
        }
    }
}