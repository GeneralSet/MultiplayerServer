type SetUsers = { type: 'SET_USERS', payload: string[] };
function setUsers(payload: string[]): SetUsers {
  return { type: 'SET_USERS', payload };
}

type SetGameType = { type: 'SET_GAME_TYPE', payload: gameType };
function setGameType(payload: gameType): SetGameType {
  return { type: 'SET_GAME_TYPE', payload };
}

export type Actions = (
  SetUsers |
  SetGameType
);

export const actions = {
  setUsers,
  setGameType,
};
