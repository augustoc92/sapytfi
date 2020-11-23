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

export const getALUMNO = () => (dispatch) => {
    dispatch({
        type: GET_MATERIA_FULFILLED,
        payload: {
            dataObj
        }
    })
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
