import { reject } from 'ramda'
import {
    GET_AULA_PENDING,
    GET_AULA_FULFILLED,
    GET_AULA_REJECTED,
    UPDATE_AULA_FULLFILED,
    UPDATE_AULA_REJETED,
    ADD_AULA_FULLFILED,
    ADD_AULA_REJECTED,
    REMOVE_AULA_FULFILLED,
    REMOVE_AULA_REJECTED
} from './const'

export const getAULA = () => (dispatch) => {
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
