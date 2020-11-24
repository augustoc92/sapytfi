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
    REMOVE_ALUMNO_REJECTED
} from './const'

export const getAlumno = () => (dispatch) => {
    dispatch({
        type: GET_ALUMNO_FULFILLED,
        payload: {
            dataObj
        }
    })
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
