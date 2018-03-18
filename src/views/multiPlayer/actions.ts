function setUsers(payload: string[]) {
  console.log(payload);
  return {
    type: 'SET_USERS',
    payload
  };
}

export const actions = {
  setUsers,
};
