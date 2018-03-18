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
