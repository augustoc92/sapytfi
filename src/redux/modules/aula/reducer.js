import initialState from './initialState'
import {
  GET_AULA_FULFILLED,
  UPDATE_AULA_FULLFILED,
  UPDATE_AULA_REJETED,
  ADD_AULA_FULLFILED,
  REMOVE_AULA_FULFILLED,
  GET_AULAALUMNO_FULFILLED,
  GET_ALUMNOS_AULA
} from './const'
import map from 'lodash/map'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AULAALUMNO_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        alumnoXAula: action.payload.result
      }
    }
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
      const { objData, objToAdd } = action.payload;
      const { body } = objData.data;

      const { alumnosRows, maxId } = body;

      const formatObject = {
        id: maxId,
        materia: objToAdd.id_materia,
        profesor: objToAdd.id_profesor,
        id_carrera: objToAdd.id_carrera,
        horario_clase: objToAdd.horario_clase,
        nombre_aula: objToAdd.nombre_aula
      }

      return {
        ...state,
        data: [...state.data, formatObject],
        alumnoXAula: [...alumnosRows]
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


