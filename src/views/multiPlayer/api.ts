import { actions } from './actions';

export function onUsers(socket: SocketIOClient.Socket) {
  return (dispatch: any) => {
    socket.on(
      'users',
      (users: string[]) => dispatch(actions.setUsers(users))
    );
  };
}
