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
      return {
        ...state,
        isFetching: false,
        data: action.payload.result
      }
    }

    case REMOVE_MATERIA_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }

    case ADD_MATERIA_FULLFILED: {
      const { idmax, obj } = action.payload;

      const id = idmax.data.body;
      const objToAdd = {
        ...obj,
        id
      }

      return {
        ...state,
        data: [...state.data, objToAdd]
      }
    }
    case UPDATE_MATERIA_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }

    case UPDATE_MATERIA_FULLFILED: {
      const { id, obj } = action.payload
      const index = state.data.findIndex(x => x.id === id)
      const newList = [...state.data]
      newList[index] = { ...obj, id }
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


