import initialState from './initialState'
import {
  GET_CARRERA_FULFILLED,
  UPDATE_CARRERA_FULLFILED,
  UPDATE_CARRERA_REJETED,
  ADD_CARRERA_FULLFILED,
  REMOVE_CARRERA_FULFILLED,
  GET_CARRERAMATERIA_FULFILLED,
  GET_MATERIACARRERA_FULL,
  GET_ALUMNOCARRERA_FULL
} from './const'
import map from 'lodash/map'


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MATERIACARRERA_FULL: {
      return {
        ...state,
        materiaXCarrera: action.payload.result
      }
    }
    case GET_ALUMNOCARRERA_FULL: {
      return {
        ...state,
        alumnoXCarrera: action.payload.result
      }
    }
    case GET_CARRERA_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        data: action.payload.result
      }
    }

    case GET_CARRERAMATERIA_FULFILLED: {
      return {
        ...state,
        isFetching: false,
        materiaXCarrera: action.payload.result
      }
    }

    case REMOVE_CARRERA_FULFILLED: {
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.payload.id)
      }
    }
    case ADD_CARRERA_FULLFILED: {
      const { data: DataObj, obj } = action.payload;
      const { data } = DataObj;
      const { maxId, rows } = data.body;
      console.log('rows', rows)
      console.log('data.body', data.body)

      const objToAdd = {
        plan_de_estudio: obj.plan,
        nombre: obj.nombre,
        lugar: obj.lugarCarrera,
        duracion: obj.duracion,
        id: maxId
      }

      return {
        ...state,
        data: [...state.data, objToAdd],
        materiaXCarrera: [...rows]
      }
    }
    case UPDATE_CARRERA_REJETED: {
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    }
    case UPDATE_CARRERA_FULLFILED: {
      const { id, obj, res } = action.payload

      const objToAdd = {
        plan_de_estudio: obj.plan,
        nombre: obj.nombre,
        lugar: obj.lugarCarrera,
        duracion: obj.duracion,
        id
      }

      const index = state.data.findIndex(x => x.id === id)
      const newList = [...state.data]
      newList[index] = { ...objToAdd, id }

      return {
        ...state,
        data: newList,
        materiaXCarrera: [...res.data.success]
      }
    }
    default:
      return state
  }

}



export default reducer


