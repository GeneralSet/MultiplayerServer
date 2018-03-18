var express = require('express');
var socket = require('socket.io');

var app = express();

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

io = socket(server);

var state = {};

io.on('connection', (socket) => {
  socket.on('joinRoom', function (data) {
    if (state[data.roomName]) {
      state[data.roomName].users.push(data.username);
    } else {
      state[data.roomName] = {users: [data.username]};
    }

    socket.join(data.roomName);
    io.sockets.in(data.roomName).emit('users', state[data.roomName].users);
  });
});
