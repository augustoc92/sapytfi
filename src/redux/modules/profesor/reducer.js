import initialState from './initialState'
import {
  GET_PROFESOR_FULFILLED,
  UPDATE_PROFESOR_FULLFILED,
  UPDATE_PROFESOR_REJETED,
  ADD_PROFESOR_FULLFILED,
  REMOVE_PROFESOR_FULFILLED,
  GET_PROFESORMATERIA_FULFILLED,
  GET_EXAMEN_FULLFILLED,
  ADD_EXAMEN_FULLFILLED
} from './const'
import map from 'lodash/map'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFESOR_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        data: action.payload.result
      }
    }

    case GET_EXAMEN_FULLFILLED: {
      console.log('action.payload', action.payload);

      return {
        ...state,
        isFetching: false,
        examen: action.payload.result
      }
    }

    case GET_PROFESORMATERIA_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        materiaXPROFESOR: action.payload.result
      }
    }

    case REMOVE_PROFESOR_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }

    case ADD_EXAMEN_FULLFILLED: {
      const { idmax, obj } = action.payload;
      const id = idmax.data.body;

      return {
        ...state,
      }
    }
    case ADD_PROFESOR_FULLFILED: {
      const { idmax, obj } = action.payload;
      const id = idmax.data.body;
      const objToAdd = {
        nombre: obj.nombre,
        dni: obj.DNI,
        email: obj.email,
        password: obj.password,
        id
      }

      return {
        ...state,
        data: [...state.data, objToAdd]
      }
    }
    case UPDATE_PROFESOR_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_PROFESOR_FULLFILED: {
      const { id, obj, res } = action.payload

      const objToAdd = {
        nombre: obj.nombre,
        dni: obj.DNI,
        email: obj.email,
        password: obj.password,
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


