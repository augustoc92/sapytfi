import React from 'react';
import NavBar from '../Shared/NavBar';
import { Modal, Button, Input, Table, InputNumber, Space, Tooltip, Dropdown, Menu } from 'antd';
import styles from './Aula.module.css'
import { map, omit } from 'lodash'
import { getMateria } from '../../redux/modules/materia/action';
import { DownOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';


class Aula extends React.Component{

    componentDidMount() {
        const { getAula, getMateria, getProfesor } = this.props

        getAula()
        getMateria();
        getProfesor();
    }

    state = {
        visibleAgregar: false,
        visibleEliminar: false,
        visibleModificar: false,
        profesorDelAula: {},
        materiaDelAula: {}
    }

    clearModals = () => {
        this.setState({
            visibleAgregar: false,
            visibleEliminar: false,
            visibleModificar: false
        });
        if(document.getElementById('nombreAula')) {
            document.getElementById('nombreAula').value = '';
            document.getElementById('horarioClaseAula').value = '';
        }
        if(document.getElementById('nombreAulaModificar')) {
            document.getElementById('nombreAulaModificar').value = '';
            document.getElementById('horarioClaseAulaModificar').value = '';
        }
    }

    handleCancel = e => {
        this.clearModals()
    };

    handleVisibleAgregar = e => {
        this.setState({
            profesorDelAula: {},
            materiaDelAula: {},
            visibleAgregar: true,
        });
    };

    handleVisibleEliminar = e => {
        this.setState({
            visibleEliminar: true,
        });
    };

    handleVisibleModificar = e => {
        const { materia, profesor, selectedRow } = this.props;

        console.log('selectedRow', selectedRow);


        const profesorDelAula = profesor.filter((carrier => carrier.id.toString() === selectedRow[0].profesor.toString()));
        const materiaDelAula = materia.filter((carrier => carrier.id.toString() === selectedRow[0].materia.toString()));

        this.setState({
            profesorDelAula: profesorDelAula[0],
            materiaDelAula: materiaDelAula[0],
            visibleModificar: true,
        });
    }

    handleOkAgregar = e => {
        const { addAula } = this.props;
        const { profesorDelAula, materiaDelAula } = this.state;
        let nombre_aula = document.getElementById('nombreAula').value;
        let horario_clase = document.getElementById('horarioClaseAula').value;

        let objToAdd = {
            nombre_aula,
            horario_clase,
            profesor: profesorDelAula,
            materia: materiaDelAula
        }

        addAula(objToAdd);
        this.clearModals();
    }


    handleOkModificar = e => {
        const { putAula, selectedRow } = this.props;
        const { profesorDelAula, materiaDelAula } = this.state;

        let nombre_aula = document.getElementById('nombreAulaModificar').value;
        let horario_clase = document.getElementById('horarioClaseAulaModificar').value;

        const idToSend = selectedRow[0].id

        let objToAdd = {
            nombre_aula,
            horario_clase,
            profesor: profesorDelAula,
            materia: materiaDelAula
        }

        putAula(idToSend, objToAdd);
        this.clearModals();
    }

    handleOkEliminar = e => {
        const { selectedRow, deleteAula, selectRow } = this.props;
        if (selectedRow && selectedRow[0]) {
            deleteAula(selectedRow[0].id);
            selectRow(null);
        }

        this.clearModals();
    }


    onChange =  (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    createMenuMateria = () => {
        const { materia } = this.props

        return (
            <Menu onClick={this.handleMenuClick}>
            {materia.map(x =>
                <Menu.Item key={x.id} onClick={() => {this.agregarMateriAula(x)}}> {x.nombre} </Menu.Item>
            )
            }
            </Menu>
        )
    };

    agregarMateriAula = (materia) => {
        this.setState({
            materiaDelAula: materia
        })
    }

    agregarProfesorAula = (prof) => {
        this.setState({
            profesorDelAula: prof
        })
    }

    createMenuProfesor = () => {
        const { profesor } = this.props

        return (
            <Menu onClick={this.handleMenuClick}>
            {profesor.map(x =>
                <Menu.Item key={x.id} onClick={() => {this.agregarProfesorAula(x)}}> {x.nombre} </Menu.Item>
            )
            }
            </Menu>
        )
    };

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
        const { materia, profesor } = this.props

        const newArray = data.map(x => {
            const profesorDelAula = profesor.filter(prof => prof.id.toString() === x.profesor.toString());
            const nombreDeLaMateria = materia.filter(materi => materi.id.toString() === x.materia.toString());
            const nombre_profesor = profesorDelAula && profesorDelAula[0] && profesorDelAula[0].nombre
            const nombre_materia = nombreDeLaMateria && nombreDeLaMateria[0] && nombreDeLaMateria[0].nombre
            return (
                {
                    ...x,
                    nombre_profesor,
                    nombre_materia,
                    key: x.id
                }
            )
        })

        return newArray;
    }

    render() {
        const { data, cols, addMateria, selectedRow } = this.props;
        const { visibleAgregar, visibleEliminar, visibleModificar, profesorDelAula, materiaDelAula } = this.state;

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
                        <label for="nombreAula">Nombre Aula</label>
                        <Input
                            id="nombreAula"
                            maxLength="30"
                        />
                        <label for="horarioClaseAula"> Horario Clase</label>
                        <Input
                            id="horarioClaseAula"
                            maxLength="45"
                        />
                        <br></br>
                        <label> Profesor del aula </label>
                        <Space>
                            <Dropdown overlay={this.createMenuProfesor()}>
                            <Button>
                                {profesorDelAula && profesorDelAula.nombre || "Seleccione un profesor"} <DownOutlined />
                            </Button>
                            </Dropdown>
                        </Space>
                        <br></br>
                        <label> Materia del aula </label>
                        <Space>
                            <Dropdown overlay={this.createMenuMateria()}>
                            <Button>
                                {materiaDelAula && materiaDelAula.nombre || "Seleccione una materia"} <DownOutlined />
                            </Button>
                            </Dropdown>
                        </Space>
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
                                <label for="nombreAulaModificar">Nombre Aula</label>
                                <Input
                                    id="nombreAulaModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].nombre_aula}
                                    maxLength="30"
                                />
                                <label for="horarioClaseAulaModificar">Horario Clase</label>
                                <Input
                                    id="horarioClaseAulaModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].horario_clase}
                                    maxLength="35"
                                />
                                <br></br>
                                <label> Profesor del aula </label>
                                <Space>
                                    <Dropdown overlay={this.createMenuProfesor()}>
                                    <Button>
                                        {profesorDelAula && profesorDelAula.nombre || "Seleccione un profesor"} <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                                <br></br>
                                <label> Materia del aula </label>
                                <Space>
                                    <Dropdown overlay={this.createMenuMateria()}>
                                    <Button>
                                        {materiaDelAula && materiaDelAula.nombre || "Seleccione una materia"} <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                            </React.Fragment>
                            ||
                            <div> Seleccione una Aula para modificar </div>
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
                            selectedRow && selectedRow[0] && <div> Esta seguro que desea eliminar el Aula {selectedRow[0].nombre} </div> ||
                            <div> Seleccione un Aula </div>
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
        dataIndex: 'nombre_aula'
    },
    {
        title: 'Materia',
        dataIndex: 'nombre_materia'
    },
    {
        title: 'Profesor',
        dataIndex: 'nombre_profesor'
    },
    {
        title: 'Horario',
        dataIndex: 'horario_clase'
    },
    {
        title: 'Prof Aux',
        dataIndex: 'profesor_auxiliar'
    }
];

export default Aula;

