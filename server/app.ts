import * as express from 'express';
import * as socket from 'socket.io';
import { Set } from '../src/Set';

const app = express();

const server = app.listen(3001);

const io = socket(server);

interface State {
  [roomName: string]: {
    users: string[];
    gameType?: string;
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
  client.on('joinRoom', function (payload: {roomName: string, username: string}) {
    if (state[payload.roomName] && state[payload.roomName].users) {
      state[payload.roomName].users.push(payload.username);
    } else {
      state[payload.roomName] = {users: [payload.username]};
    }

    client.join(payload.roomName);
    io.sockets.in(payload.roomName).emit('users', state[payload.roomName].users);
  });

  client.on('setGameType', function (payload: {roomName: string, gameType: string}) {
    state[payload.roomName].gameType = payload.gameType;
    io.sockets.in(payload.roomName).emit('setGameType', payload.gameType);
  });

  client.on('startGame', function (payload: {roomName: string }) {
    const deck = set.initDeck();
    const gameState = set.updateBoard(deck, [], 0);
    state[payload.roomName].gameState = gameState;
    io.sockets.in(payload.roomName).emit('startGame', gameState);
  });

});
