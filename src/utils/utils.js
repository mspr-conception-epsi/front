/* eslint-disable no-undef */
export const checkOffline = () => {
  const networkState = navigator.connection.type;
  if (networkState === Connection.NONE) return true;
  else return false;
};
