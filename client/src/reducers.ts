import { combineReducers } from 'redux';
import { reducer as multiPlayerReducer, initialState as multiPlayerState } from './views/multiPlayer/reducers';

export interface ReduxState {
  multiPlayer: typeof multiPlayerState;
}

export const rootReducer = combineReducers({
  multiPlayer: multiPlayerReducer
});
