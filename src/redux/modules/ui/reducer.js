// Initial State
import initialState from './initialState'

import { CHANGE_COLLAPSED_SIDEBAR, SELECT_ROW, LOGIN_FULLFILLED } from './const'

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLLAPSED_SIDEBAR: {
      return {
        ...state,
        collapsed: action.payload.collapsed
      }
    }
    case LOGIN_FULLFILLED: {
      console.log('actio.payload', action.payload);
      return {
        ...state,
        user: action.payload.user
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



