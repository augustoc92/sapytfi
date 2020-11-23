import initialState from './initialState'
import {
  GET_MATERIA_FULFILLED,
  UPDATE_MATERIA_FULLFILED,
  UPDATE_MATERIA_REJETED,
  ADD_MATERIA_FULLFILED,
  REMOVE_MATERIA_FULFILLED,
} from './const'
import map from 'lodash/map'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATERIA_FULFILLED: {
      console.log('action.payload', action.payload)
      return {
        ...state,
        isFetching: false,
        data: action.payload.dataObj
      }
    }

    case REMOVE_MATERIA_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }
    case ADD_MATERIA_FULLFILED: {
      return {
        ...state,
      }
    }
    case UPDATE_MATERIA_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_MATERIA_FULLFILED: {
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


