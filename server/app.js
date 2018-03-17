var express = require('express');
var socket = require('socket.io');

var app = express();

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
});
