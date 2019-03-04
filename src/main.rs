#[macro_use] extern crate log;
extern crate env_logger;
extern crate actix;
extern crate actix_web;
extern crate serde;
extern crate serde_json;

use std::time::{Instant, Duration};
use std::collections::HashMap;

use serde_json::Result as JSON_Result;
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
            id: 0,
        },
    )
}

struct WsSession {
    /// unique session id
    id: usize,

}

impl Actor for WsSession {
    type Context = ws::WebsocketContext<Self>;

}

#[derive(Serialize, Deserialize)]
struct Event {
    eventType: String,
    username: Option<String>,
    roomName: Option<String>,
}


fn event_router(data: String) -> JSON_Result<String> {
    let event: Event = serde_json::from_str(data.as_str())?;  
    let response = "";

    if(event.eventType == "joinRoom") {
        error!("joinRoom Event!");
    } else {
      error!("No route for event type: {}", event.eventType);
    }
    
    Ok(response.to_string())
}

/// Handler for ws::Message message
impl StreamHandler<ws::Message, ws::ProtocolError> for WsSession {

    fn handle(&mut self, msg: ws::Message, ctx: &mut Self::Context) {
        error!("handle");
        match msg {
            ws::Message::Text(text) => ctx.text(
                match event_router(text) {
                    Ok(s) => s,
                    _ => "Invalid event".to_string()
                }
            ),
            ws::Message::Close(_) => {
                ctx.stop();
            },  
            _ => error!("Message type not handled")
        }
    }
}

fn main() {
    env_logger::init();
    info!("init");

    // Start chat server actor in separate thread
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
      
    info!("Started http server: 127.0.0.1:3001");

}