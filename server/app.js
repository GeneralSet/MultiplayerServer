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
        var user = { name: payload.username, points: 0 };
        if (state[payload.roomName] && state[payload.roomName].users) {
            state[payload.roomName].users.push(user);
        }
        else {
            state[payload.roomName] = { users: [user] };
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
        io.sockets["in"](payload.roomName).emit('updateGame', gameState);
    });
    client.on('verifySet', function (payload) {
        // check for set
        var isValidSet = set.isSet(payload.selected);
        if (!isValidSet) {
            // error: 'Not a set.'
            // points: this user points - 1
            return;
        }
        var gameState = state[payload.roomName].gameState;
        if (gameState === undefined) {
            return;
        }
        // Set found
        var newBoard = gameState.board;
        payload.selected.forEach(function (id) {
            newBoard.splice(newBoard.indexOf(id), 1);
        });
        var updatedState = set.updateBoard(gameState.deck, newBoard, gameState.numberOfSets);
        // points: this user points - 1
        state[payload.roomName].gameState = updatedState;
        io.sockets["in"](payload.roomName).emit('updateGame', updatedState);
    });
});
