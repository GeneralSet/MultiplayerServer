//! `Server` is an actor. It maintains list of connection client session.
//! And manages game state for each room.

use actix::prelude::*;
use rand::{self, rngs::ThreadRng, Rng};
use std::collections::{HashMap, HashSet};

pub struct User {
    name: String,
    score: isize,
}

pub struct Selection {
    user: String,
    valid: bool,
    selection: Vec<String>,
}

pub struct Game {
    number_of_sets: usize,
    deck: Option<String>,
    board: Option<String>,
    previous_selection: Option<Selection>
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
    fn emit_users(&self, room_name: String, skip_id: usize) {
        if let Some(session) = self.sessions.get_mut(&room_name) {
            // loop through session.users
                // continue if skip_id == user key
                // addr.do_send(Vector of users);
            for user in session.users {
                // skip if ha
            }
        }
    }
    fn emit_gamestate(&self, room_name: String, skip_id: usize) {
    }
}

/// Join room, if room does not exists create new one.
#[derive(Message)]
pub struct Join {
    pub id: usize,
    pub username: String,
    pub room_name: String,
}

// Join room, send disconnect message to old room
/// send join message to new room
impl Handler<Join> for Server {
    type Result = ();

    fn handle(&mut self, msg: Join, _: &mut Context<Self>) {
        let Join { id, username, room_name } = msg;

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
                name: username,
                score: 0,
            }
        );
        self.emit_users(room_name, id);
    }
}