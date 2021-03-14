import { reject } from 'ramda'
import {
    GET_AULA_PENDING,
    GET_AULA_FULFILLED,
    GET_AULA_REJECTED,
    UPDATE_AULA_FULLFILED,
    UPDATE_AULA_REJETED,
    ADD_AULA_FULLFILED,
    ADD_AULA_REJECTED,
    GET_AULAALUMNO_FULFILLED,
    REMOVE_AULA_FULFILLED,
    REMOVE_AULA_REJECTED,
    GET_ALUMNOS_AULA,
    GET_MATERIAL,
    DELETE_FILE,
    GUARDAR_MATERIAL,
    CERRAR_CUATRIMESTRE,
    GET_CUATRI
} from './const'

import { getAulaAPI,
    getAulaAlumnosAPI, addAulaAPI, deleteAulaAPI, putAulaAPI,
    getAulaFilesAPI, deleteFileAPI, guardarMaterialAPI, cerrarCuatrimetreAPI,
    getCuatrimestresAPI  }
from '../../../helpers/api/aula';



export const getCuatrimestres = obj => (dispatch) => {
    getCuatrimestresAPI(obj)
        .then(result =>
            dispatch({
                type: GET_CUATRI,
                payload: {
                    result
                }
            }))
}

export const cerrarCuatrimetre = obj => (dispatch) => {
    cerrarCuatrimetreAPI(obj)
        .then(res =>
            dispatch({
                type: CERRAR_CUATRIMESTRE,
                payload: {
                    obj,
                    res
                }
            }))
}

export const deleteFile = (id, obj) => (dispatch) => {
    console.log('delete file', id, obj);
    deleteFileAPI(id, obj)
        .then(res =>
            dispatch({
                type: DELETE_FILE,
                payload: {
                    id
                }
            }))
}


export const guardarMaterial = obj => (dispatch) => {
    guardarMaterialAPI(obj)
        .then(res =>
            dispatch({
                type: GUARDAR_MATERIAL,
                payload: {
                    obj,
                    res
                }
            }))
}

export const getMaterialAula = () => (dispatch) => {
    getAulaFilesAPI()
        .then(result =>
            dispatch({
                type: GET_MATERIAL,
                payload: {
                    result
                }
            })
        )
}

export const getAula = () => (dispatch) => {
    getAulaAPI()
        .then(result =>
            dispatch({
                type: GET_AULA_FULFILLED,
                payload: {
                    result
                }
            })
        )
}

export const getAlumnosXAula = () => (dispatch) => {
    getAulaAlumnosAPI()
        .then(result =>
            dispatch({
                type: GET_AULAALUMNO_FULFILLED,
                payload: {
                    result
                }
            })
        )
}


export const addAula = obj => (dispatch) => {

    const objToAdd = {
        id_materia: obj.materia.id,
        id_profesor: obj.profesor.id,
        id_carrera: obj.carreraDelAula.id,
        horario_clase: obj.horario_aula,
        nombre_aula: obj.nombre_aula,
        alumnos: obj.alumnos,
        imagenDelAula: obj.imagenDelAula
    }

    addAulaAPI(objToAdd)
        .then(objData =>
            dispatch({
                type: ADD_AULA_FULLFILED,
                payload: {
                    objToAdd,
                    objData
                }
            })
        )
}

export const putAula = (id, obj) => (dispatch) => {

    const objToAdd = {
        id_carrera: obj.carreraDelAula.id,
        id_materia: obj.materia.id,
        id_profesor: obj.profesor.id,
        horario_clase: obj.horarioAula,
        nombre_aula: obj.nombreAula,
        alumnos: obj.alumnos,
        imagenDelAula: obj.imagenDelAula
    }

    putAulaAPI(id, objToAdd)
        .then(res =>
            dispatch({
                type: UPDATE_AULA_FULLFILED,
                payload: {
                    id,
                    obj,
                    res
                }
            })
        )
}

export const deleteAula = id => (dispatch) => {
    deleteAulaAPI(id)
        .then(res =>
            dispatch({
                type: REMOVE_AULA_FULFILLED,
                payload: {
                    id
                }
            })
        )
}
const dataObj = [
    {
        key: '1',
        materia: 'Matematica 1',
        profesor: 40,
    },
    {
        key: '2',
        materia: 'Matematica 1',
        profesor: 40,
    },
    {
        key: '3',
        materia: 'Matematica 1',
        profesor: 40,
    },
    {
        key: '4',
        materia: 'Matematica 1',
        profesor: 40,
    },
];
