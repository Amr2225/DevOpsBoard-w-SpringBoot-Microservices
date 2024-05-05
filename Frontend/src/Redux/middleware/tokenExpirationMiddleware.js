import { removeAuthToken } from "../reducers/UserReducer";

export const tokenExpirationMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const user = state.user;

  if (user.token && Date.now() >= user.userData.exp * 1000) {
    store.dispatch(removeAuthToken());
  }

  return next(action);
};
