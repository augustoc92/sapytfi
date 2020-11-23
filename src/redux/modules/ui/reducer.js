// Initial State
import initialState from './initialState'

import { CHANGE_COLLAPSED_SIDEBAR, SELECT_ROW } from './const'

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COLLAPSED_SIDEBAR: {
      return {
        ...state,
        collapsed: action.payload.collapsed
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



