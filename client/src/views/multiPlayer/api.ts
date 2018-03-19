import { Dispatch } from 'redux';
import { actions } from './actions';

export function onUsers(socket: SocketIOClient.Socket) {
  return (dispatch: Dispatch<{}>) => {
    socket.on(
      'users',
      (users: User[]) => dispatch(actions.setUsers(users))
    );
  };
}

export function setGameType(socket: SocketIOClient.Socket) {
  return (dispatch: Dispatch<{}>) => {
    socket.on(
      'setGameType',
      (gameType: gameType) => dispatch(actions.setGameType(gameType))
    );
  };
}

export function updateGame(socket: SocketIOClient.Socket) {
  return (dispatch: Dispatch<{}>) => {
    socket.on(
      'updateGame',
      (gameState: GameState) => dispatch(actions.setGameState(gameState))
    );
  };
}
