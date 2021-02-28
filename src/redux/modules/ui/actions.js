// import const
import { CHANGE_COLLAPSED_SIDEBAR,
  SELECT_ROW,
  LOGIN_FULLFILLED,
  LOGIN_REJECTED,
  LOGIN_PENDING,
  CHANGE_PASSWORD,
  GET_ADMIN
} from './const'

import { cambiarPasswordAPI, getAdminAPI } from '../../../helpers/api/ui';

// eslint-disable-next-line
export const toggleSideBar = shouldCollapse => (dispatch) => {
  dispatch({
    type: CHANGE_COLLAPSED_SIDEBAR,
    payload: {
      collapsed: !shouldCollapse
    }
  })
}
export const loggear = (userFacade, userObj) => (dispatch) => {
  dispatch({
    type: LOGIN_FULLFILLED,
    payload: {
      userFacade,
      userObj
    }
  })
}

export const changePass = newUser => (dispatch) => {
  cambiarPasswordAPI(newUser)
  .then(() =>
      dispatch({
          type: CHANGE_PASSWORD,
          payload: {
            newUser
          }
      })
  );
}

export const getAdmin = () => (dispatch) => {
  getAdminAPI()
    .then(admin =>
      dispatch({
        type: GET_ADMIN,
        payload: {
          admin
        }
  }))
}

export const selectRow = row => (dispatch) => {
  dispatch({
    type: SELECT_ROW,
    payload: {
      selectedRow: row
    }
  })
}