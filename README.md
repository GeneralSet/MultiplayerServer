# General Set
Websocket server for general set

## Run Locally
```
cargo run
```

## Run With Docker
```
docker build . -t actix
docker run -p 3001:3001 -e RUST_ENV="production" actix
```