import { reject } from 'ramda'
import {
    GET_CARRERA_PENDING,
    GET_CARRERA_FULFILLED,
    GET_CARRERA_REJECTED,
    UPDATE_CARRERA_FULLFILED,
    UPDATE_CARRERA_REJETED,
    ADD_CARRERA_FULLFILED,
    ADD_CARRERA_REJECTED,
    REMOVE_CARRERA_FULFILLED,
    REMOVE_CARRERA_REJECTED
} from './const'

export const getCarrera = () => (dispatch) => {
    dispatch({
        type: GET_CARRERA_FULFILLED,
        payload: {
            dataObj
        }
    })
}

const dataObj = [
    {
        key: '1',
        nombre: 'Ingeneria',
        materias: 40,
        planDeEstudio: 'T108',
    },
    {
        key: '2',
        nombre: 'Profesorado',
        materias: 15,
        planDeEstudio: 'T109',
    },
    {
        key: '3',
        nombre: 'Abogacia',
        materias: 32,
        planDeEstudio: 'IC03',
    },
    {
        key: '4',
        nombre: 'Mecanica',
        materias: 32,
        planDeEstudio: 'P03',
    },
];
