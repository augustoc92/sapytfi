// import const
import { CHANGE_COLLAPSED_SIDEBAR, SELECT_ROW } from './const'

// eslint-disable-next-line
export const toggleSideBar = shouldCollapse => (dispatch) => {
  dispatch({
    type: CHANGE_COLLAPSED_SIDEBAR,
    payload: {
      collapsed: !shouldCollapse
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