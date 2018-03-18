"use strict";
exports.__esModule = true;
var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(3001);
var io = socket(server);
var state = {};
io.on('connection', function (client) {
    client.on('joinRoom', function (data) {
        if (state[data.roomName]) {
            state[data.roomName].users.push(data.username);
        }
        else {
            state[data.roomName] = { users: [data.username] };
        }
        client.join(data.roomName);
        io.sockets["in"](data.roomName).emit('users', state[data.roomName].users);
    });
});
