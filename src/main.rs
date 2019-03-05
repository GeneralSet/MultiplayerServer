#![feature(type_alias_enum_variants)]
#[macro_use] extern crate log;
extern crate env_logger;
extern crate actix;
extern crate actix_web;
extern crate serde;
extern crate serde_json;
extern crate set;
extern crate rand;

use std::time::{Instant, Duration};
use std::collections::HashMap;

use serde_json::{Result as JSON_Result};
use serde::{Deserialize, Serialize};
use log::Level;
use actix::*;
use actix_web::server::HttpServer;
use actix_web::{fs, http, ws, App, Error, HttpRequest, HttpResponse};

mod server;

/// How often heartbeat pings are sent
const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(25);
/// How long before lack of client response causes a timeout
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);


/// This is our websocket route state, this state is shared with all route
/// instances via `HttpContext::state()`
struct WsSessionState {
    addr: Addr<server::Server>,
}

/// Entry point for our route
fn chat_route(req: &HttpRequest<WsSessionState>) -> Result<HttpResponse, Error> {
    ws::start(
        req,
        WsSession {
        },
    )
}

struct WsSession {
}

impl Actor for WsSession {
    type Context = ws::WebsocketContext<Self, WsSessionState>;
}

#[derive(Serialize, Deserialize)]
struct Event<'a> {
    eventType: &'a str,
    username: Option<&'a str>,
    roomName: Option<&'a str>,
    gameType: Option<&'a str>,
}


fn event_router(ctx: &mut ws::WebsocketContext<WsSession, WsSessionState>, event: Event) {
    match event.eventType {
        "joinRoom" => {
            error!("joinRoom Event!");
            let addr = ctx.address();
            ctx.state().addr.do_send(server::Join {
                addr: addr.recipient(),
                username: match event.username {
                    Some(u) => u,
                    None => "",
                }.to_string(),
                room_name: match event.roomName {
                    Some(u) => u,
                    None => "",
                }.to_string(),
            });
            ctx.text("joined");
        },
        "setGameType" => {
            error!("setGameType Event!");
            ctx.state().addr.do_send(server::SetGameType {
                game_type: match event.gameType {
                    Some(u) => u,
                    None => "",
                }.to_string(),
                room_name: match event.roomName {
                    Some(u) => u,
                    None => "",
                }.to_string(),
            });
            ctx.text("joined");
        },
        "startGame" => {
            error!("startGame Event!");
            ctx.state().addr.do_send(server::StartGame {
                room_name: match event.roomName {
                    Some(u) => u,
                    None => "",
                }.to_string(),
            });
            ctx.text("joined");
        },
        _ => {
            error!("No handler for event type: {}", event.eventType);
        }
    };
}

/// Handle messages from chat server, we simply send it to peer websocket
impl Handler<server::Message> for WsSession {
    type Result = ();

    fn handle(&mut self, msg: server::Message, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}


/// Handler for ws::Message message
impl StreamHandler<ws::Message, ws::ProtocolError> for WsSession {

    fn handle(&mut self, msg: ws::Message, ctx: &mut Self::Context) {
        error!("handle");
        match msg {
            ws::Message::Text(text) => {
                error!("msg recived {}", text);
                let event: Event = match serde_json::from_str(text.as_str()) {
                    JSON_Result::Ok(event) => {
                        event
                    },
                    _ => {
                        Event {
                            eventType: "Invalid data format",
                            username: None,
                            roomName: None,
                            gameType: None,
                        }
                    }
                };
                event_router(ctx, event);
            },
            ws::Message::Close(_) => {
                ctx.stop();
            },  
            _ => error!("Message type not handled")
        }
    }
}

fn main() {
    env_logger::init();

    let sys = actix::System::new("multiplayer-server");

    // Start server actor in separate thread
    let server = Arbiter::start(|_| server::Server::default());
    
    // Create Http server with websocket support
    HttpServer::new(move || {
        // Websocket sessions state
        let state = WsSessionState {
            addr: server.clone(),
        };

        App::with_state(state)
        // websocket
        .resource("/", |r| r.route().f(chat_route))

    }).bind("127.0.0.1:3001")
    .unwrap()
    .start();

    let _ = sys.run();
}