"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var express = require("express");
var socket = require("socket.io");
var set_1 = require("set/pkg/node/set");
var app = express();
var server = app.listen(4001);
app.use(express.static('../client/dist'));
var io = socket(server);
var state = {};
var set = new set_1.Set(4, 3);
function emitUsers(roomName, users) {
    var userKeys = Object.keys(users);
    var userValues = userKeys.map(function (v) { return users[v]; });
    io.sockets["in"](roomName).emit('users', userValues);
}
io.on('connection', function (client) {
    client.on('joinRoom', function (payload) {
        var user = { name: payload.username, points: 0 };
        if (!state[payload.roomName]) {
            state[payload.roomName] = { users: {} };
        }
        state[payload.roomName].users[client.id] = user;
        client.join(payload.roomName);
        emitUsers(payload.roomName, state[payload.roomName].users);
    });
    client.on('setGameType', function (payload) {
        if (state[payload.roomName].gameState !== undefined) {
            return;
        }
        state[payload.roomName].gameType = payload.gameType;
        io.sockets["in"](payload.roomName).emit('setGameType', payload.gameType);
    });
    client.on('startGame', function (payload) {
        var deck = set.init_deck();
        var gameState = set.update_board(deck, [], 0);
        state[payload.roomName].gameState = gameState;
        io.sockets["in"](payload.roomName).emit('updateGame', gameState);
    });
    client.on('verifySet', function (payload) {
        // check for set
        var isValidSet = set.is_set(payload.selected);
        if (!isValidSet) {
            state[payload.roomName].users[client.id].points -= 1;
            emitUsers(payload.roomName, state[payload.roomName].users);
            var gameState_1 = state[payload.roomName].gameState;
            if (gameState_1 === undefined) {
                return;
            }
            io.sockets["in"](payload.roomName).emit('updateGame', __assign({}, gameState_1, { previousSelection: {
                    user: state[payload.roomName].users[client.id].name,
                    valid: false,
                    selection: payload.selected
                } }));
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
        var updatedState = set.update_board(gameState.deck, newBoard, gameState.numberOfSets);
        state[payload.roomName].users[client.id].points += 1;
        state[payload.roomName].gameState = __assign({}, updatedState, { previousSelection: {
                user: state[payload.roomName].users[client.id].name,
                valid: true,
                selection: payload.selected
            } });
        io.sockets["in"](payload.roomName).emit('updateGame', state[payload.roomName].gameState);
        emitUsers(payload.roomName, state[payload.roomName].users);
    });
});
