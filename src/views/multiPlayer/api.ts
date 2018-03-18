import { Dispatch } from 'redux';
import { actions } from './actions';

export function onUsers(socket: SocketIOClient.Socket) {
  return (dispatch: Dispatch<{}>) => {
    socket.on(
      'users',
      (users: string[]) => dispatch(actions.setUsers(users))
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
