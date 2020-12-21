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
      return {
        ...state,
        isFetching: false,
        data: action.payload.result
      }
    }

    case REMOVE_AULA_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }

    case ADD_AULA_FULLFILED: {
      const { idmax, objToAdd } = action.payload;
      const id = idmax.data.body;
      const formatObject = {
        id,
        materia: objToAdd.id_materia,
        profesor: objToAdd.id_profesor,
        horario_clase: objToAdd.horario_clase,
        nombre_aula: objToAdd.nombre_aula
      }

      return {
        ...state,
        data: [...state.data, formatObject]
      }
    }
    case UPDATE_AULA_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }

    case UPDATE_AULA_FULLFILED: {
      const { obj, id } = action.payload

      const formatObject = {
        id,
        materia: obj.materia.id,
        profesor: obj.profesor.id,
        horario_clase: obj.horario_clase,
        nombre_aula: obj.nombre_aula
      }

      const index = state.data.findIndex(x => x.id === id)
      const newList = [...state.data]
      newList[index] = formatObject
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


