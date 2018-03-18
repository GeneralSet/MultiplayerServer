import * as io from 'socket.io-client';

export const initialState = {
  socket: io('localhost:3001'),
  users: [] as string[],
};

export function reducer(state: typeof initialState = initialState, action: any) {
  switch (action.type) {
    case 'SET_USERS':
      return {...state, users: action.payload };
    default:
      return state;
  }
}
