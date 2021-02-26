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
    REMOVE_AULA_REJECTED
} from './const'

import { getAulaAPI, getAulaAlumnosAPI, addAulaAPI, deleteAulaAPI, putAulaAPI } from '../../../helpers/api/aula';


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

export const getAlumnosAula = () => (dispatch) => {
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
        horario_clase: obj.horario_aula,
        nombre_aula: obj.nombre_aula,
        alumnos: obj.alumnos
    }

    addAulaAPI(objToAdd)
        .then(idmax =>
            dispatch({
                type: ADD_AULA_FULLFILED,
                payload: {
                    objToAdd,
                    idmax
                }
            })
        )
}

export const putAula = (id, obj) => (dispatch) => {

    const objToAdd = {
        id_materia: obj.materia.id,
        id_profesor: obj.profesor.id,
        horario_clase: obj.horario_clase,
        nombre_aula: obj.nombre_aula
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
