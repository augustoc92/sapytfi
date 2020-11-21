import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT
} from './const';

export const login = (email, password) => (dispatch) => {
  dispatch({
    type: LOGIN_PENDING
  });

  const body = {
    email,
    password
  };

  return {}
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  });
};
