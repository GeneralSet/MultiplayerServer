type SetUsers = { type: 'SET_USERS', payload: User[] };
function setUsers(payload: User[]): SetUsers {
  return { type: 'SET_USERS', payload };
}

type SetGameType = { type: 'SET_GAME_TYPE', payload: gameType };
function setGameType(payload: gameType): SetGameType {
  return { type: 'SET_GAME_TYPE', payload };
}

type SetGameState = { type: 'SET_GAME_STATE', payload: GameState };
function setGameState(payload: GameState): SetGameState {
  return { type: 'SET_GAME_STATE', payload };
}

export type Actions = (
  SetUsers |
  SetGameType |
  SetGameState
);

export const actions = {
  setUsers,
  setGameType,
  setGameState,
};
