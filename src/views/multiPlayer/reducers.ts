import * as io from 'socket.io-client';
import { Actions } from './actions';

export const initialState = {
  socket: io('localhost:3001'),
  users: [] as string[],
};

export function reducer(state: typeof initialState = initialState, action: Actions) {
  switch (action.type) {
    case 'SET_USERS':
      return {...state, users: action.payload };
    default:
      return state;
  }
}
