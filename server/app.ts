#!/usr/bin/env nodejs
import * as express from 'express';
import * as socket from 'socket.io';
import { Set } from './Set';

const app = express();

const server = app.listen(3001);

app.use(express.static('../client/build'));

const io = socket(server);

interface Users {
  [id: string]: {
    name: string;
    points: number;
  };
}

interface State {
  [roomName: string]: {
    users: Users;
    gameType?: string;
    gameState?: {
      deck: string[];
      board: string[];
      numberOfSets: number;
      previousSelection?: {
        user: string;
        valid: boolean;
        selection: string[];
      };
    }
  };
}
var state: State = {};
const set = new Set();

function emitUsers(roomName: string, users: Users) {
  const userKeys = Object.keys(users);
  const userValues = userKeys.map((v) =>  users[v]);
  io.sockets.in(roomName).emit('users', userValues);
}

io.on('connection', (client) => {
  client.on('joinRoom', function(payload: {roomName: string, username: string}) {
    const user = { name: payload.username, points: 0 };
    if (!state[payload.roomName]) {
      state[payload.roomName] = { users: {} };
    }
    state[payload.roomName].users[client.id] = user;

    client.join(payload.roomName);

    emitUsers(payload.roomName, state[payload.roomName].users);
  });

  client.on('setGameType', function (payload: {roomName: string, gameType: string}) {
    if (state[payload.roomName].gameState !== undefined) {
      return;
    }
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
      state[payload.roomName].users[client.id].points -= 1;
      emitUsers(payload.roomName, state[payload.roomName].users);
      const gameState = state[payload.roomName].gameState;
      if (gameState === undefined) {
        return;
      }
      io.sockets.in(payload.roomName).emit(
        'updateGame',
        {...gameState, previousSelection: {
          user: state[payload.roomName].users[client.id].name,
          valid: false,
          selection: payload.selected,
        }}
      );
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
    state[payload.roomName].users[client.id].points += 1;
    state[payload.roomName].gameState = {
      ...updatedState,
      previousSelection: {
        user: state[payload.roomName].users[client.id].name,
        valid: true,
        selection: payload.selected,
      }
    };

    io.sockets.in(payload.roomName).emit('updateGame', state[payload.roomName].gameState);
    emitUsers(payload.roomName, state[payload.roomName].users);
  });

});
