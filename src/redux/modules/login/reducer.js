import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT
} from './const';

import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isFetching: true,
        errorMsg: '',
        data: {}
      }
    }
    case LOGIN_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        errorMsg: '',
        data: action.payload
      }
    }
    case LOGIN_REJECTED: {
      return {
        ...state,
        isFetching: false,
        errorMsg: action.payload.errorMsg
      }
    }
    case LOGOUT: {
      return initialState
    }
    default:
      return state
  }
};

export default reducer;
