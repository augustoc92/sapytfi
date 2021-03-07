import initialState from './initialState'
import {
  GET_AULA_FULFILLED,
  UPDATE_AULA_FULLFILED,
  UPDATE_AULA_REJETED,
  ADD_AULA_FULLFILED,
  REMOVE_AULA_FULFILLED,
  GET_AULAALUMNO_FULFILLED,
  GET_ALUMNOS_AULA,
  GET_MATERIAL,
  DELETE_FILE,
  GUARDAR_MATERIAL
} from './const'
import map from 'lodash/map'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FILE: {
      return {
        ...state,
        material: state.material.filter(x => x.id !== action.payload.id)
      }
    }

    case GUARDAR_MATERIAL: {
      const { obj } = action.payload;
      console.log('actionpayload', action.payload.res.data.body);
      const id =  action.payload.res.data.body;
      const newItem = {
          id: id,
          ...obj
      }
      return {
        ...state,
        material: [...state.material, newItem]
      }
    }

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
    case GET_MATERIAL: {
      return {
        ...state,
        material: action.payload.result
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
        nombre_aula: objToAdd.nombre_aula,
        imagenDelAula: objToAdd.imagenDelAula
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
      const { obj, id, res } = action.payload

      const alumnosAula = res.data;

      const formatObject = {
        id,
        materia: obj.materia.id,
        id_carrera: obj.carreraDelAula.id,
        profesor: obj.profesor.id,
        horario_clase: obj.horarioAula,
        nombre_aula: obj.nombreAula,
        imagenDelAula: obj.imagenDelAula
      }

      const index = state.data.findIndex(x => x.id === id)
      const newList = [...state.data]
      newList[index] = formatObject

      return {
        ...state,
        alumnoXAula: [...alumnosAula],
        data: newList
      }
    }
    default:
      return state
  }

}



export default reducer


