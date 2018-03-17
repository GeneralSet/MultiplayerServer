var express = require('express');
var socket = require('socket.io');

var app = express();

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

io = socket(server);

var state = {};

io.on('connection', (socket) => {
  console.log(state);
  socket.on('createRoom', function (data) {
    state[data.roomName] = {
      users: [data.username]
    }
    socket.join(data.roomName);
    socket.emit('users', state[data.roomName].users);
  });

  socket.on('join', function (data) {
    state[data.roomName].users.push(data.username);
    socket.join(data.roomName);
    socket.emit('users', state[data.roomName].users);
  });
});
