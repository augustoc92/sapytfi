import { Table } from 'antd';
import React from 'react'
import styles from './CRUDTable.module.css'
import { map, omit } from 'lodash'
import { Modal, Button, Input } from 'antd';
import MateriaForm from '../../Form/MateriaForm'
import AlumnoForm from '../../Form/AlumnoForm'
import { makeField } from '../../../helpers/makeField'

const { TextArea } = Input;

class CRUDTable extends React.Component{

    componentDidMount() {
        const { data } = this.props;
        this.setState({
            data: data
        })
    }

    onChange =  (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    state = {
        visible: false,
        data: [],
        csv: '',
        event: '',
        modalEvent: ''
    };

    showModal = (eventName, objToHandle) => {
        this.setState({
            visible: true,
            event: eventName,
            modalEvent: `${eventName} ${objToHandle}`,
            handlingObj: objToHandle
        });
    };

    setValues = (value) => {
        console.log('value', value);
        this.setState({
            csv: value
        })
    }

    checkFormInsideModal = () => {
        const { handlingObj, event } = this.state;
        switch (handlingObj) {
            case 'Materia':
                return <MateriaForm></MateriaForm>
                break;
            case 'Alumno':
                if (event === 'AgregarCSV') {
                    return (
                        <TextArea
                            rows={4}
                            placeholder="Nombre,DNI,legajo"
                            onChange={event => this.setValues(event.target.value)}
                        />
                    )
                }
                return <AlumnoForm></AlumnoForm>
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

        var jsonObj = [];
        var arr = this.state.csv.split('\n');
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
            }
            jsonObj.push(obj);
        }
        console.log(JSON.stringify(jsonObj));

        let dataMutation = this.state.data;

        for (let index = 0; index < jsonObj.length; index++) {
            jsonObj[index].key = index + 10;
        }

        this.setState({
            visible: false,
            data: [...dataMutation, ...jsonObj],
            csv: '',
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
        const { columns, objToHandle } = this.props;
        const { handlingObj, data, modalEvent, visible, selectedRow } = this.state;

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
                        onClick={() => this.showModal('AgregarCSV', this.props.objToHandle)}>
                            Agregar CSV
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



export default CRUDTable;




