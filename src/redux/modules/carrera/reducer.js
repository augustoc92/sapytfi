import initialState from './initialState'
import {
  GET_CARRERA_FULFILLED,
  UPDATE_CARRERA_FULLFILED,
  UPDATE_CARRERA_REJETED,
  ADD_CARRERA_FULLFILED,
  REMOVE_CARRERA_FULFILLED,
} from './const'
import map from 'lodash/map'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARRERA_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        data: action.payload.dataObj
      }
    }

    case REMOVE_CARRERA_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }
    case ADD_CARRERA_FULLFILED: {
      return {
        ...state,
      }
    }
    case UPDATE_CARRERA_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_CARRERA_FULLFILED: {
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


