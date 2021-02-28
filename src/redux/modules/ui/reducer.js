// Initial State
import initialState from './initialState'

import { CHANGE_COLLAPSED_SIDEBAR, SELECT_ROW, LOGIN_FULLFILLED, CHANGE_PASSWORD, GET_ADMIN } from './const'

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLLAPSED_SIDEBAR: {
      return {
        ...state,
        collapsed: action.payload.collapsed
      }
    }
    case GET_ADMIN: {
      const { admin } = action.payload;
      return {
        ...state,
        admin: [...admin]
      }
    }
    case LOGIN_FULLFILLED: {
      console.log('actio.payload', action.payload);
      return {
        ...state,
        user: action.payload.userFacade,
        userObj: action.payload.userObj
      }
    }
    case CHANGE_PASSWORD: {
        return {
          ...state
        }
    }
    case SELECT_ROW: {
      return {
        ...state,
        selectedRow: action.payload.selectedRow
      }
    }
    default:
      return state
  }
}



