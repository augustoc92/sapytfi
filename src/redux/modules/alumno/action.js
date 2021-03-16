import { reject } from 'ramda'
import {
    GET_ALUMNO_PENDING,
    GET_ALUMNO_FULFILLED,
    GET_ALUMNO_REJECTED,
    UPDATE_ALUMNO_FULLFILED,
    UPDATE_ALUMNO_REJETED,
    ADD_ALUMNO_FULLFILED,
    ADD_ALUMNO_REJECTED,
    REMOVE_ALUMNO_FULFILLED,
    REMOVE_ALUMNO_REJECTED,
    TOMAR_EXAMEN,
    GET_EXAMEN_NOTA
} from './const'

import { getAlumnoAPI, addAlumnoAPI, deleteAlumnoAPI, putAlumnoAPI, sumarIntentoAPI, tomarExamenAPI,
    getExamenesNotaAPI } from '../../../helpers/api/alumno';

export const getAlumno = () => (dispatch) => {
    getAlumnoAPI()
        .then(result =>
            dispatch({
                type: GET_ALUMNO_FULFILLED,
                payload: {
                    result
                }
            })
        )
}

export const getExamenNota = () => (dispatch) => {
    getExamenesNotaAPI()
        .then(result =>
            dispatch({
                type: GET_EXAMEN_NOTA,
                payload: {
                    result
                }
            })
        )
}

export const tomarExamen = (obj) => (dispatch) => {
    tomarExamenAPI(obj)
        .then(id =>
            dispatch({
                type: TOMAR_EXAMEN,
                payload: {
                    id,
                    obj
                }
            })
        )
}

export const addAlumno = (obj, user) => (dispatch) => {
    const objToSend ={
        obj,
        user
    }
    addAlumnoAPI(objToSend)
        .then(idmax =>
            dispatch({
                type: ADD_ALUMNO_FULLFILED,
                payload: {
                    obj,
                    idmax
                }
            })
        )
}

export const putAlumno = (id, obj, user) => (dispatch) => {
    const objToSend ={
        obj,
        user
    }
    putAlumnoAPI(id, objToSend)
        .then(res =>
            dispatch({
                type: UPDATE_ALUMNO_FULLFILED,
                payload: {
                    id,
                    obj,
                    res
                }
            })
        )
}

export const deleteAlumno = (id, user) => (dispatch) => {
    deleteAlumnoAPI(id, user)
        .then(res =>
            dispatch({
                type: REMOVE_ALUMNO_FULFILLED,
                payload: {
                    id
                }
            })
        )
}

const dataObj = [
    {
        key: '1',
        nombre: 'Augusto',
        DNI: 3003454,
        legajo: 101,
    },
    {
        key: '2',
        nombre: 'Pedro',
        DNI: 3434954,
        legajo: 102,
    },
    {
        key: '3',
        nombre: 'Julia',
        DNI: 3463454,
        legajo: 103,
    },
    {
        key: '4',
        nombre: 'Mateo',
        DNI: 3434543,
        legajo: 40,
    },
    {
        key: '5',
        nombre: 'Juan',
        DNI: 3453454,
        legajo: 40,
    },
];
