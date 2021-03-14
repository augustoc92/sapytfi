import React from 'react';
import NavBar from '../Shared/NavBar';
import { Modal, Button, Input, Table, InputNumber } from 'antd';
import styles from './Subject.module.css'

class Subject extends React.Component{
    constructor(props) {
        super(props);
        this.refName = React.createRef();

    }

    componentDidMount() {
        const { getMateria } = this.props

        getMateria()
    }

    state = {
        visibleAgregar: false,
        visibleEliminar: false,
        visibleModificar: false,
        errorMessage: '',
        nombreMateria: '',
        hoursValue: 0
    }

    clearModals = () => {
        this.setState({
            visibleAgregar: false,
            visibleEliminar: false,
            visibleModificar: false,
            errorMessage: '',
            nombreMateria: '',
            hoursValue: 0
        });
    }

    handleCancel = e => {
        this.clearModals()
    };

    handleVisibleAgregar = e => {
        this.setState({
            visibleAgregar: true,
        });
    };

    handleVisibleEliminar = e => {
        this.setState({
            visibleEliminar: true,
        });
    };

    handleVisibleModificar = e => {
        const { selectedRow } = this.props;

        const hoursString = selectedRow[0].horas_catedra;
        const nombre = selectedRow[0].nombre;


        const hours = parseInt(hoursString)

        this.setState({
            visibleModificar: true,
            hoursValue: hours,
            nombreMateria: nombre
        });
    }

    handleOkAgregar = e => {
        const { addMateria } = this.props;
        let nombre = document.getElementById('nombreMateria').value;
        let horas_catedra = document.getElementById('duracionMateria').value;

        let objToAdd = {
            nombre,
            horas_catedra
        }


        const nombres = this.props.data.map(x => x.nombre)

        if (nombres.indexOf(nombre) > -1) {
            this.setState({
                errorMessage: 'Ya existe una materia con este nombre'
            })
            document.getElementById('nombreMateria').focus();
            return ;
        }
        if (!nombre) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreMateria').focus();
            return ;
        }

        addMateria(objToAdd);
        this.clearModals();
    }


    handleOkModificar = e => {
        const { putMateria, selectedRow } = this.props;
        let nombre = document.getElementById('nombreModificar').value;
        let horas_catedra = document.getElementById('duracionModificar').value;

        const idToSend = selectedRow[0].id

        let objToAdd = {
            nombre,
            horas_catedra
        }

        const nombres = this.props.data.filter(x => x.nombre !== selectedRow[0].nombre).map(x => x.nombre)

        if (nombres.indexOf(nombre) > -1) {
            this.setState({
                errorMessage: 'Ya existe una materia con este nombre'
            })
            document.getElementById('nombreModificar').focus();
            return ;
        }
        if (!nombre) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreModificar').focus();
            return ;
        }

        putMateria(idToSend, objToAdd);
        this.clearModals();
    }

    handleOkEliminar = e => {
        const { selectedRow, deleteMateria, selectRow } = this.props;
        if (selectedRow && selectedRow[0]) {
            deleteMateria(selectedRow[0].id);
            selectRow(null);
        }

        this.clearModals();
    }


    onChange =  (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    onChangeHours = (val) => {
        const res = val.replace(/\D/g, "");
        this.setState({
            hoursValue: res
        });
    }

    handleNameChange = (val) => {
        this.setState({
            nombreMateria: val
        });
    }

    rowSelection = {
        onChange: (selectedRowKeys, selectedRow) => {
            const { selectRow } = this.props;
            selectRow(selectedRow)
        },
        getCheckboxProps: record => ({
            disabled: record.nombre === 'No configurada', // Column configuration not to be checked
            name: record.nobmre,
        }),
    };

    createKeys(data) {
        const newArray = data.map(x => {
            return (
                {
                    ...x,
                    key: x.id
                }
            )
        })
        return newArray;
    }

    render() {
        const { data, cols, addMateria, selectedRow } = this.props;
        const { visibleAgregar, visibleEliminar, visibleModificar, hoursValue, errorMessage, nombreMateria } = this.state;

        const tableData = this.createKeys(data);

        const hasSelectedRow = selectedRow && !!selectedRow[0]


        return(
            <div>
                <NavBar />
                {data &&
                    <Table
                        rowSelection={{
                            type: "radio",
                            ...this.rowSelection,
                        }}
                        columns={columns}
                        dataSource={tableData}
                        onChange={this.onChange}
                    />
                }
                {/* AGREGAR */}
                <Modal
                    visible={visibleAgregar}
                    onOk={this.handleOkAgregar}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.formContainer}>
                        <label htmlFor="nombreMateria">Nombre (de 4 a 12 caracteres):</label>
                        <Input
                            id="nombreMateria"
                            maxLength="12"
                            value={nombreMateria}
                            onChange={(e) => this.handleNameChange(e.target.value)}
                        />
                        <label htmlFor="duracionMateria">Duracion</label>
                        <InputNumber
                            onChange={val => this.onChangeHours(val)}
                            value={hoursValue}
                            min={0}
                            max={200}
                            id="duracionMateria"
                        />
                        <br></br>
                        { errorMessage &&
                            <label className={styles.errorMessage}> {errorMessage} </label>
                        }
                    </div>
                </Modal>
                {/* MODIFICAR */}
                <Modal
                    visible={visibleModificar}
                    onOk={this.handleOkModificar}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.formContainer}>
                        { selectedRow && selectedRow[0]
                            &&
                            <React.Fragment>
                                <label htmlFor="nombreModificar">Nombre (de 4 a 12 caracteres):</label>
                                <Input
                                    id="nombreModificar"
                                    onChange={(e) => this.handleNameChange(e.target.value)}
                                    value={nombreMateria}
                                    maxLength="30"
                                />
                                <label htmlFor="duracionModificar">Duracion</label>
                                <InputNumber
                                    onChange={val => this.onChangeHours(val)}
                                    value={hoursValue}
                                    min={0}
                                    max={200}
                                    id="duracionModificar"
                                />
                                <br></br>
                                { errorMessage &&
                                    <label className={styles.errorMessage}> {errorMessage} </label>
                                }
                            </React.Fragment>
                            ||
                            <div> Seleccione una materia para modificar </div>
                        }
                    </div>
                </Modal>
                {/* ELIMINAR */}
                <Modal
                    visible={visibleEliminar}
                    onOk={this.handleOkEliminar}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.formContainer}>
                        {
                            selectedRow && selectedRow[0] && <div> Esta seguro que desea eliminar la materia {selectedRow[0].nombre} </div> ||
                            <div> Seleccione una materia </div>
                        }

                    </div>
                </Modal>
                <div className={styles.buttonContainer}>
                    <Button
                        type="primary"
                        onClick={() => this.handleVisibleAgregar()}>
                            Agregar
                    </Button>
                    <Button
                        type="primary"
                        disabled={!hasSelectedRow}
                        onClick={() => this.handleVisibleModificar()}>
                            Modificar
                    </Button>
                    <Button
                        type="primary"
                        disabled={!hasSelectedRow}
                        onClick={() => this.handleVisibleEliminar()}>
                            Eliminar
                    </Button>
                </div>
            </div>
        )
    }
}


const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre'
    },
    {
        title: 'Duracion en horas',
        dataIndex: 'horas_catedra',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.horas_catedra - b.horas_catedra,
    }
];

export default Subject;

