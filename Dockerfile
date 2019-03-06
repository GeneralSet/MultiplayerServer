FROM liuchong/rustup as builder

RUN rustup default nightly
WORKDIR /

# create a new shell project
RUN USER=root cargo new multiplayer_server --bin
WORKDIR /multiplayer_server

# copy over manifests
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

# cache your dependencies
RUN cargo build --release

# replace shell source tree
RUN rm src/*.rs
COPY ./src ./src

# rebuild for release
RUN rm ./target/x86_64-unknown-linux-musl/release/deps/multiplayer_server*
RUN cargo build --release



FROM alpine:3.8
COPY --from=builder /multiplayer_server/target/x86_64-unknown-linux-musl/release/multiplayer_server .
EXPOSE 3001
CMD ["/multiplayer_server"]
