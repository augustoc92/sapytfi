import React from 'react';
import NavBar from '../Shared/NavBar';
import CRUDTable from '../Shared/CRUDTable';
import { Button } from 'antd';
import styles from './Subject.module.css'

class Subject extends React.Component{

    componentDidMount() {
        const { getMateria } = this.props
        getMateria()
    }

    render() {
        const { data, cols } = this.props;

        return(
            <div>
                <NavBar />
                <CRUDTable
                    columns={columns}
                    data={data}
                    objToHandle='Materia'
                />
            </div>
        )
    }
}


const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre'
    },
    {
        title: 'Duracion en horas',
        dataIndex: 'duracion',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.duracion - b.duracion,
    },
    {
        title: 'Lugar',
        dataIndex: 'lugar',
        filters: [
        {
            text: 'Rosario',
            value: 'Rosario',
        },
        {
            text: 'San Nicolas',
            value: 'San Nicolas',
        },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.lugar.indexOf(value) === 0,
        sorter: (a, b) => a.lugar.length - b.lugar.length,
        sortDirections: ['descend', 'ascend'],
    },
];

export default Subject;

