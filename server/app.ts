import * as express from 'express';
import * as socket from 'socket.io';
import { Set } from '../src/Set';

const app = express();

const server = app.listen(3001);

const io = socket(server);

interface State {
  [roomName: string]: {
    users: string[];
    gameState?: {
      deck: string[];
      board: string[];
      numberOfSets: number;
    }
  };
}
var state: State = {};
const set = new Set();

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

  client.on('start', function (data: {roomName: string}) {
    const deck = set.initDeck();
    const initialState = set.updateBoard(deck, [], 0);
    state[data.roomName].gameState = initialState;
    io.sockets.in(data.roomName).emit('gameState', state[data.roomName].gameState);

  });

});
