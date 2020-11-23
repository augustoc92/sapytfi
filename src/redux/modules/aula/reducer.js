import initialState from './initialState'
import {
  GET_AULA_FULFILLED,
  UPDATE_AULA_FULLFILED,
  UPDATE_AULA_REJETED,
  ADD_AULA_FULLFILED,
  REMOVE_AULA_FULFILLED,
} from './const'
import map from 'lodash/map'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AULA_FULFILLED: {
      console.log('action.payload', action.payload)
      return {
        ...state,
        isFetching: false,
        data: action.payload.dataObj
      }
    }

    case REMOVE_AULA_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }
    case ADD_AULA_FULLFILED: {
      return {
        ...state,
      }
    }
    case UPDATE_AULA_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_AULA_FULLFILED: {
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


