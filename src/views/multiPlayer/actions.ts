type SetUsers = { type: 'SET_USERS', payload: string[] };
function setUsers(payload: string[]): SetUsers {
  return { type: 'SET_USERS', payload };
}

export type Actions = (
  SetUsers
);

export const actions = {
  setUsers,
};
