import initialState from './initialState'
import {
  GET_ALUMNO_FULFILLED,
  UPDATE_ALUMNO_FULLFILED,
  UPDATE_ALUMNO_REJETED,
  ADD_ALUMNO_FULLFILED,
  REMOVE_ALUMNO_FULFILLED,
} from './const'
import map from 'lodash/map'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALUMNO_FULFILLED: {
      console.log('action.payload', action.payload)
      return {
        ...state,
        isFetching: false,
        data: action.payload.dataObj
      }
    }

    case REMOVE_ALUMNO_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }
    case ADD_ALUMNO_FULLFILED: {
      return {
        ...state,
      }
    }
    case UPDATE_ALUMNO_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_ALUMNO_FULLFILED: {
      const { item } = action.payload
      const index = state.data.findIndex(x => x.id === item.id)
      const newList = [...state.data]
      newList[index] = item
      return {
        ...state,
        data: newList
      }
    }
    default:
      return state
  }

}



export default reducer


