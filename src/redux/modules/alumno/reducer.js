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
      return {
        ...state,
        isFetching: false,
        data: action.payload.result
      }
    }

    case REMOVE_ALUMNO_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }
    case ADD_ALUMNO_FULLFILED: {
      const { idmax, obj } = action.payload;
      const id = idmax.data.body;

      const objToAdd = {
        nombre: obj.nombre,
        dni: obj.dni,
        email: obj.email,
        carrera: obj.id_carrera,
        password: obj.password,
        id
      }

      return {
        ...state,
        data: [...state.data, objToAdd]
      }
    }
    case UPDATE_ALUMNO_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_ALUMNO_FULLFILED: {
      const { id, obj, res } = action.payload

      const objToAdd = {
        nombre: obj.nombre,
        dni: obj.dni,
        email: obj.email,
        password: obj.password,
        carrera: obj.id_carrera ,
        id
      }

      const index = state.data.findIndex(x => x.id === id)
      const newList = [...state.data]
      newList[index] = { ...objToAdd, id }
      return {
        ...state,
        data: newList,

      }
    }
    default:
      return state
  }

}



export default reducer


