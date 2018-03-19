import * as io from 'socket.io-client';
import { Actions } from './actions';

export const initialState = {
  socket: io(process.env.NODE_ENV === 'development' ? 'localhost:3001' : 'generalset.io'),
  users: [] as User[],
  gameType: '',
  gameState: {},
};

export function reducer(state: typeof initialState = initialState, action: Actions) {
  switch (action.type) {
    case 'SET_USERS':
      return {...state, users: action.payload };
    case 'SET_GAME_TYPE':
      return {...state, gameType: action.payload };
    case 'SET_GAME_STATE':
      return {...state, gameState: action.payload };
    default:
      return state;
  }
}
