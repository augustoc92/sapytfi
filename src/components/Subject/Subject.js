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
                    columns={cols}
                    data={data && data}
                    objToHandle='Materia'
                />
            </div>
        )
    }
}

export default Subject;

