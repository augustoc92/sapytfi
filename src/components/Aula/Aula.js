import React from 'react';
import NavBar from '../Shared/NavBar';
import { Modal, Button, Input, Table, InputNumber, Space, Tooltip, Dropdown, Menu } from 'antd';
import styles from './Aula.module.css'
import { map, omit, differenceBy, union, filter } from 'lodash'

import { getMateria } from '../../redux/modules/materia/action';
import { DownOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';


class Aula extends React.Component{

    componentDidMount() {
        const { getAula, getMateria, getProfesor, getAlumno, getCarrera, getAlumnosXCarrera, getMateriaXCarrera } = this.props

        getAula()
        getMateria();
        getProfesor();
        getAlumno();
        getMateriaXCarrera();
        getAlumnosXCarrera();
        getCarrera();
    }

    state = {
        visibleAgregar: false,
        visibleEliminar: false,
        visibleModificar: false,
        nommbreAula: '',
        horarioAula: '',
        alumnos: [],
        carreraDelAula: {},
        profesorDelAula: {},
        materiaDelAula: {},
        errorMessage: ''
    }

    clearModals = () => {
        this.setState({
            visibleAgregar: false,
            visibleEliminar: false,
            visibleModificar: false,
            nommbreAula: '',
            horarioAula: '',
            carreraDelAula: {},
            alumnos: [],
            materiaDelAula: {},
            profesorDelAula: {},
            errorMessage: ''

        });

    }

    handleNameChange = (val) => {
        this.setState({
            nommbreAula: val
        });
    }

    handleHoraChange = (val) => {
        this.setState({
            horarioAula: val
        });
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
        const { profesorDelAula, materiaDelAula, nommbreAula, horarioAula, alumnos } = this.state;

        let objToAdd = {
            nombre_aula: nommbreAula,
            horario_aula: horarioAula,
            profesor: profesorDelAula,
            materia: materiaDelAula,
            alumnos
        }

        if (!nommbreAula) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreAula').focus();
            return ;
        }
        if (!horarioAula) {
            this.setState({
                errorMessage: 'Ingrese un horario de clase'
            })
            document.getElementById('horarioClaseAula').focus();
            return ;
        }
        if (!(profesorDelAula && profesorDelAula.id)){
            console.log('profesor')
            this.setState({
                errorMessage: 'Seleccione el profesor a cargo del aula'
            });
            return ;
        }
        if (!(materiaDelAula && materiaDelAula.id)){
            this.setState({
                errorMessage: 'Seleccione la materia del aula'
            });
            return ;
        }


        addAula(objToAdd);
        this.clearModals();
    }


    handleOkModificar = e => {
        const { putAula, selectedRow } = this.props;
        const { profesorDelAula, materiaDelAula, horarioAula , nombreAula } = this.state;

        const idToSend = selectedRow[0].id

        let objToAdd = {
            nombreAula,
            horarioAula,
            profesor: profesorDelAula,
            materia: materiaDelAula
        }

        if (!nombreAula) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreAulaModificar').focus();
            return ;
        }
        if (!horarioAula) {
            this.setState({
                errorMessage: 'Ingrese un horario de clase'
            })
            document.getElementById('horarioClaseAulaModificar').focus();
            return ;
        }
        if (!(profesorDelAula && profesorDelAula.id)){
            this.setState({
                errorMessage: 'Seleccione el profesor a cargo del aula'
            });
            return ;
        }
        if (!(materiaDelAula && materiaDelAula.id)){
            this.setState({
                errorMessage: 'Seleccione las materias del aula'
            });
            return ;
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

    createMenuCarrera = () => {
        const { carrera } = this.props

        return (
            <Menu onClick={this.handleMenuClick}>
            {  carrera.map(x =>
                <Menu.Item key={x.id} onClick={() => this.setState({ carreraDelAula: x })}> {x.nombre} </Menu.Item>
                )
            }
            </Menu>
        )
    }

    createMenuMateria = () => {
        const { materia, materiaXCarrera } = this.props
        const { carreraDelAula } = this.state;

        const idCarrera = carreraDelAula.id;

        const IdMateriasDeLaCarrera = materiaXCarrera.filter(x => x.id_carrera === idCarrera.toString()).map(x => x.id_materia)
        let materiasDeCarrera = [];

        for (let index = 0; index < materia.length; index++) {
            IdMateriasDeLaCarrera.forEach(element => {
                if (materia[index].id.toString() === element) {
                    materiasDeCarrera.push(materia[index]);
                }
            });
        }

        return (
            <Menu onClick={this.handleMenuClick}>
            {materiasDeCarrera.map(x =>
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

    createAlumnoMenu = () => {
        const { alumno, alumnoXCarrera } = this.props
        const { carreraDelAula } = this.state;
        const alumnoState = this.state.alumnos
        const idCarrera = carreraDelAula.id;

        console.log('aluno,', alumno)
        console.log('alumnoXCarrera,', alumnoXCarrera)

        const idAlumnosCarrera = alumnoXCarrera.filter(x => x.id_carrera === idCarrera.toString()).map(x => x.id_alumno)
        let alumnosCarrera = [];

        for (let index = 0; index < alumno.length; index++) {
            idAlumnosCarrera.forEach(element => {
                if (alumno[index].id.toString() === element) {
                    alumnosCarrera.push(alumno[index]);
                }
            });
        }

        console.log('idAlumnosCarrera', idAlumnosCarrera)
        console.log('alumnosCarrera', alumnosCarrera)

        const myDifferences = differenceBy(alumnosCarrera, alumnoState, 'email')

        console.log('myDifferences', myDifferences)


        return (
            <Menu onClick={this.handleMenuClick}>
            {myDifferences.map(x =>
                <Menu.Item key={x.id} onClick={() => this.addAlumnoToArray(x)}> {x.email} </Menu.Item>
            )
            }
            </Menu>
        )
    };

    addAlumnoToArray = (alumno) => {
        const { alumnos } = this.state;

        this.setState({
            ...this.state,
            alumnos: [...alumnos, alumno]
        })
    }

    removeAlumnoFromArray = (id) => {
        const { alumnos } = this.state;
        const filteredItems = alumnos.filter(al => al.id !== id);

        this.setState({
            alumnos: [...filteredItems]
        })

    }


    renderAlumnos = () => {
        const { alumnos } = this.state;

        return (
            alumnos.map(alumn => {
                return (
                    <Button key={alumn.id} type="text" onClick={() => this.removeAlumnoFromArray(alumn.id)}>
                        {alumn.email}
                        <span className={styles.eraseIcon}>
                            <DeleteOutlined />
                        </span>
                    </Button>
                )
            })
        )
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
        const { visibleAgregar, visibleEliminar, visibleModificar,
            profesorDelAula, errorMessage, materiaDelAula,
            carreraDelAula
        } = this.state;

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
                        <label htmlFor="nombreAula">Nombre Aula</label>
                        <Input
                            id="nombreAula"
                            onChange={(e) => this.handleNameChange(e.target.value)}
                            maxLength="30"
                        />
                        <label htmlFor="horarioClaseAula"> Horario Clase</label>
                        <Input
                            id="horarioClaseAula"
                            onChange={(e) => this.handleHoraChange(e.target.value)}
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
                        <label> Carrera </label>
                        <Space>
                            <Dropdown overlay={this.createMenuCarrera()}>
                            <Button>
                                {carreraDelAula && carreraDelAula.nombre || "Seleccione una carrera"} <DownOutlined />
                            </Button>
                            </Dropdown>
                        </Space>
                        {carreraDelAula && carreraDelAula.nombre &&
                            <React.Fragment>
                                <br></br>
                                <label> Materia del aula </label>
                                <Space>
                                    <Dropdown overlay={this.createMenuMateria()}>
                                    <Button>
                                        {materiaDelAula && materiaDelAula.nombre || "Seleccione una materia"} <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                                <br></br>
                                <Space>
                                    <Dropdown overlay={this.createAlumnoMenu()}>
                                    <Button>
                                        Agregar alumnos <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                                <br></br>
                                <div className={styles.alumnosContainer}>
                                    { this.renderAlumnos() }
                                </div>
                            </React.Fragment>
                        }
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
                                <label htmlFor="nombreAulaModificar">Nombre Aula</label>
                                <Input
                                    id="nombreAulaModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].nombre_aula}
                                    maxLength="30"
                                />
                                <label htmlFor="horarioClaseAulaModificar">Horario Clase</label>
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
                                <label> Carrera </label>
                                <Space>
                                    <Dropdown overlay={this.createMenuCarrera()}>
                                    <Button>
                                        {carreraDelAula && carreraDelAula.nombre || "Seleccione una carrera"} <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                                {carreraDelAula && carreraDelAula.nombre &&
                                    <React.Fragment>
                                <br></br>
                                <label> Materia del aula </label>
                                <Space>
                                    <Dropdown overlay={this.createMenuMateria()}>
                                    <Button>
                                        {materiaDelAula && materiaDelAula.nombre || "Seleccione una materia"} <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                                <br></br>
                                <Space>
                                    <Dropdown overlay={this.createAlumnoMenu()}>
                                    <Button>
                                        Agregar alumnos <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                                <br></br>
                                <div className={styles.alumnosContainer}>
                                    { this.renderAlumnos() }
                                </div>
                            </React.Fragment>
                        }
                                <br></br>
                                { errorMessage &&
                                    <label className={styles.errorMessage}> {errorMessage} </label>
                                }
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
    }
];

export default Aula;

