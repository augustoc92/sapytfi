// import const
import { CHANGE_COLLAPSED_SIDEBAR, SELECT_ROW, LOGIN_FULLFILLED, LOGIN_REJECTED, LOGIN_PENDING} from './const'

// eslint-disable-next-line
export const toggleSideBar = shouldCollapse => (dispatch) => {
  dispatch({
    type: CHANGE_COLLAPSED_SIDEBAR,
    payload: {
      collapsed: !shouldCollapse
    }
  })
}
export const loggear = user => (dispatch) => {
  dispatch({
    type: LOGIN_FULLFILLED,
    payload: {
      user
    }
  })
}
export const selectRow = row => (dispatch) => {
  dispatch({
    type: SELECT_ROW,
    payload: {
      selectedRow: row
    }
  })
}