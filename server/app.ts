import * as express from 'express';
import * as socket from 'socket.io';
import { Set } from '../src/Set';

const app = express();

const server = app.listen(3001);

const io = socket(server);

interface State {
  [roomName: string]: {
    users: [
      {
        // TODO use socket id for adding points.
        name: string,
        points: number
      }
    ];
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
    const user = { name: payload.username, points: 0 };
    if (state[payload.roomName] && state[payload.roomName].users) {
      state[payload.roomName].users.push(user);
    } else {
      state[payload.roomName] = {users: [user]};
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
    io.sockets.in(payload.roomName).emit('updateGame', gameState);
  });

  client.on('verifySet', function (payload: {roomName: string, selected: string[] }) {
    // check for set
    const isValidSet = set.isSet(payload.selected);
    if (!isValidSet) {
      // error: 'Not a set.'
      // points: this user points - 1
      return;
    }

    const gameState = state[payload.roomName].gameState;
    if (gameState === undefined) {
      return;
    }

    // Set found
    const newBoard = gameState.board;
    payload.selected.forEach((id) => {
      newBoard.splice(newBoard.indexOf(id), 1);
    });

    const updatedState = set.updateBoard(gameState.deck, newBoard, gameState.numberOfSets);
    // points: this user points - 1
    state[payload.roomName].gameState = updatedState;
    io.sockets.in(payload.roomName).emit('updateGame', updatedState);
  });

});
