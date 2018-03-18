import * as express from 'express';
import * as socket from 'socket.io';

const app = express();

const server = app.listen(3001);

const io = socket(server);

interface State {
  [roomName: string]: {
    users: string[];
    board?: string[];
  };
}
var state: State = {};

io.on('connection', (client) => {
  client.on('joinRoom', function (data: {roomName: string, username: string}) {
    if (state[data.roomName]) {
      state[data.roomName].users.push(data.username);
    } else {
      state[data.roomName] = {users: [data.username]};
    }

    client.join(data.roomName);
    io.sockets.in(data.roomName).emit('users', state[data.roomName].users);
  });
});
