import { Table } from 'antd';
import styles from './CRUDTable.module.css'
import { map, omit } from 'lodash'
import { Modal, Button, Input } from 'antd';
import MateriaForm from '../../Form/MateriaForm'
import { makeField } from '../../../helpers/makeField'
import React from 'react';

class CRUDTable extends React.Component{

    onChange =  (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    state = {
        visible: false,
        modalEvent: ''
    };

    showModal = (eventName, objToHandle) => {
        this.setState({
            visible: true,
            modalEvent: `${eventName} ${objToHandle}`,
            handlingObj: objToHandle
        });
    };

    checkFormInsideModal = () => {
        console.log('this.state', this.state);
        const { handlingObj } = this.state;
        switch (handlingObj) {
            case 'Materia':
                return <MateriaForm></MateriaForm>
                break;

            default:
                break;
        }
        const { selectedRow } = this.state;

        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }

        if (selectedRow) {
            return map(omit(selectedRow[0], ['key']), (value, key) => (
                <div
                    key={key}
                >
                <div className={styles.prop}>
                    {capitalize(key)}
                </div>
                    {this.renderInput(key)}
            </div>
            ))
        };
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);

        this.setState({
            visible: false,
        });
    };

    rowSelection = {
        onChange: (selectedRowKeys, selectedRow) => {
            const { selectRow } = this.props;
            selectRow(selectedRow)
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    render() {
        const { data, objToHandle } = this.props;
        const { handlingObj, modalEvent, visible, selectedRow } = this.state

        return(
            <div>
                <Table
                    rowSelection={{
                        type: "radio",
                        ...this.rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    onChange={this.onChange}
                />
                <Modal
                    title={modalEvent}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.checkFormInsideModal()}
                </Modal>
                <div className={styles.buttonContainer}>
                    <Button
                        type="primary"
                        onClick={() => this.showModal('Agregar', this.props.objToHandle)}>
                            Agregar
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.showModal('Modificar', this.props.objToHandle)}>
                            Modificar
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => this.showModal('Eliminar', this.props.objToHandle)}>
                            Eliminar
                    </Button>
                </div>

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

export default CRUDTable;




