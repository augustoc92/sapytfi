import React from 'react';
import NavBar from '../Shared/NavBar';
import CRUDTable from '../Shared/CRUDTable';
import { Button } from 'antd';
import styles from './Alumno.module.css'

class Alumno extends React.Component{

    componentDidMount() {
        const { getAlumno } = this.props
        getAlumno()
    }

    render() {
        const { data, cols } = this.props;

        return(
            <div>
                <NavBar />
                <CRUDTable
                    columns={columns}
                    data={data}
                    objToHandle='Alumno'
                />
            </div>
        )
    }
}

const columns = [
    {
        title: 'nombre',
        dataIndex: 'nombre'
    },
    {
        title: 'DNI',
        dataIndex: 'DNI',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.DNI - b.DNI,
    },
    {
        title: 'legajo',
        dataIndex: 'legajo',
        sorter: (a, b) => a.legajo.length - b.legajo.length,
        sortDirections: ['descend', 'ascend'],
    },
];

export default Alumno;

