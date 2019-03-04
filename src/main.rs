#[macro_use] extern crate log;
extern crate env_logger;
extern crate actix;
extern crate actix_web;
extern crate serde;
extern crate serde_json;

use serde_json::Result;
use serde::{Deserialize, Serialize};
use log::Level;
use std::collections::HashMap;
use actix::prelude::*;
use actix_web::{
    server, ws, App
};

struct User {
    name: String,
    points: usize,
}

struct Selection {
    user: String,
    valid: bool,
    selection: Vec<String>,
}

struct Game {
    number_of_sets: usize,
    deck: Option<String>,
    board: Option<String>,
    previous_selection: Option<Selection>
}

struct Lobby {
    users: HashMap<User, String>,
    game_type: Option<String>,
}

#[derive(Serialize, Deserialize)]
struct Event {
    eventType: String,
    username: Option<String>,
    roomName: Option<String>,
}

/// Define http actor
struct Ws;

impl Actor for Ws {
    type Context = ws::WebsocketContext<Self>;
}

fn event_router(data: String) -> Result<String> {
    error!("router");
    error!("data: {}", data);

    let event: Event = serde_json::from_str(data.as_str())?;
    error!("event: {}", event.eventType);

    let response = "";
    if(event.eventType == "joinRoom") {
        error!("joinRoom Event!");
    } else {
      error!("No route for event type: {}", event.eventType);
    }
    Ok(response.to_string())
}

/// Handler for ws::Message message
impl StreamHandler<ws::Message, ws::ProtocolError> for Ws {

    fn handle(&mut self, msg: ws::Message, ctx: &mut Self::Context) {
        error!("handle");
        match msg {
            ws::Message::Text(text) => ctx.text(
                match event_router(text) {
                    Ok(s) => s,
                    _ => "Invalid event".to_string()
                }
            ),
            _ => error!("Message type not handled")
        }
    }
}

fn main() {
        env_logger::init();
        error!("init");
        server::new(|| App::new().resource("/", |r| r.f(|req| ws::start(req, Ws))))
        .bind("127.0.0.1:3001")
        .unwrap()
        .run();
}