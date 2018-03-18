"use strict";
exports.__esModule = true;
var express = require("express");
var socket = require("socket.io");
var Set_1 = require("../src/Set");
var app = express();
var server = app.listen(3001);
var io = socket(server);
var state = {};
var set = new Set_1.Set();
io.on('connection', function (client) {
    client.on('joinRoom', function (payload) {
        if (state[payload.roomName] && state[payload.roomName].users) {
            state[payload.roomName].users.push(payload.username);
        }
        else {
            state[payload.roomName] = { users: [payload.username] };
        }
        client.join(payload.roomName);
        io.sockets["in"](payload.roomName).emit('users', state[payload.roomName].users);
    });
    client.on('setGameType', function (payload) {
        state[payload.roomName].gameType = payload.gameType;
        io.sockets["in"](payload.roomName).emit('setGameType', payload.gameType);
    });
    client.on('startGame', function (payload) {
        var deck = set.initDeck();
        var gameState = set.updateBoard(deck, [], 0);
        state[payload.roomName].gameState = gameState;
        io.sockets["in"](payload.roomName).emit('startGame', gameState);
    });
});
