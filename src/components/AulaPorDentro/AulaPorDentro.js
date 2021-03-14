import React, { Component } from 'react';
import styles from './AulaPorDentro.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card, Button, Modal, Input, Radio, Collapse } from 'antd';
import Icon from '@ant-design/icons';
import { uniqBy } from 'lodash'
import CrearExamen from './CrearExamen';
import LineChart from '../Shared/LineChart'
import SubirMaterialComp from './SubirMaterial'
import { Progress } from 'antd';
import MaterialAula from './MaterialAula';
import CerrarCuatrimestre from './CerrarCuatrimestre';

import {
    AppstoreOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    CarryOutFilled,
    MailOutlined,
    DiffOutlined,
    OrderedListOutlined,
    ContactsOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Panel } = Collapse;

const { SubMenu } = Menu;

// const HeartSvg = () => (
//     <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
//         <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
//     </svg>
// );

// const HeartIcon = props => <Icon component={HeartSvg} {...props} />;

class AulaPorDentro extends Component {

    state = {
        collapsed: false,
        mostrarEst: false,
        mostrarExamenes: false,
        mostrarMaterial: false,
        mostrarRevisionmaterial: false,
        cerrarCuatrimestre: false,
        aula: 0,
        examenId: ''
    };

    componentDidMount() {
        const { getExamen, getCuatrimestres, getMaterialAula, getPreguntas, getExamenNota, getAlumnosXAula, getAlumno } = this.props;

        getExamen();
        getMaterialAula();
        getPreguntas();
        getExamenNota();
        getAlumnosXAula();
        getAlumno();
        getCuatrimestres();


        this.setState({
            // aula: this.props.location.param1.x.id
            aula: 25
        })
    }


    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    getEstadisticasExamenOBJ = (examen) => {
        const filteredByAulas = examen.filter(x => x.aula === this.state.aula);

        const filterByExam = uniqBy(filteredByAulas, 'id_examen');

        return filterByExam.map(x => {
            return ({
                data: [
                    {
                        name: "Intento",
                        value: x.intentos
                    },
                    {
                        name: "Aciertos",
                        value: x.aciertos
                    }
                ],
                label: x.titulo,
                id_examen: x.id_examen
            })
        })
    }

    renderCharts = () => {
        const { examen } = this.props;

        const examenEst = this.getEstadisticasExamenOBJ(examen);

        const example = examenEst.map(x =>  <LineChart dataS={x}/>)

        return [...example];
    }

    renderClases = () => {
        const { examen } = this.props;

        const filteredByAulas = examen.filter(x => x.aula === this.state.aula);
        const filterByExam = uniqBy(filteredByAulas, 'id_examen');

        return filterByExam.map(x => {
            return(
                <Menu.Item onClick={() => this.handleShowExamenes(x.id_examen)}>
                    {x.titulo}
                </Menu.Item>
            )
        })
    }

    renderExamenes = () => {
        const { examen, deleteExamen, preguntasExamen } = this.props;
        const { examenId, aula } = this.state
        const filteredByAulas = examen.filter(x => x.aula === aula);
        const filterByExam = uniqBy(filteredByAulas, 'id_examen');
        const elExamen = filterByExam.filter(j => j.id_examen === examenId);
        const preguntas = preguntasExamen.filter(x => x.id_examen === examenId.toString());

        console.log(elExamen);

        return elExamen.map(x => (
                    <div className={styles.preguntasContainer}>
                        <h3> {elExamen[0].titulo} </h3>
                        <Collapse defaultActiveKey={['1']} style={{width: '60%'}}>
                        {
                            preguntas.map(preg => {
                                return (
                                        <Panel header={preg.pregunta} key={preg.id}>
                                            {
                                                preg.posibles_rtas.split('-').map(item => (
                                                <p> {item} </p>
                                                ))
                                            }
                                        </Panel>
                                )
                            })
                        }
                    </Collapse>
                    <div style={{marginTop: '20px', display: 'flex'}}>
                        <Button type="primary"  onClick={() => deleteExamen(x.id_examen)}> Editar {x.titulo} </Button>
                        <Button type="primary"  danger onClick={() => deleteExamen(x.id_examen)}> Eliminar {x.titulo} </Button>
                    </div>

                    </div>
            ))
    }

    renderExamenesCreados = () => {
        const { examen } = this.props;
        const { aula } = this.state
        const filteredByAulas = examen.filter(x => x.aula === aula);
        const filterByExam = uniqBy(filteredByAulas, 'id_examen');

        return filterByExam.map(x => {
            return(
                <Menu.Item onClick={() => this.handleShowExamenes(x.id_examen)}>
                    {x.titulo}
                </Menu.Item>
            )
        })
    }

    renderMaterial = () => {
        const { userObj, guardarMaterial } = this.props

        return <SubirMaterialComp aula={this.state.aula} guardarMaterial={guardarMaterial} user={userObj.id}/>
    }

    renderRevisionMaterial = () => {
        const { aula } = this.state
        const { deleteFile } = this.props;
        const filtradoXAula = this.props.material.filter(x => x.aula === aula)

        return <MaterialAula data={filtradoXAula}  deleteFile={deleteFile}/>
    }

    handleShowExamenes = (id) => {
        this.setState({
            mostrarEst: false,
            mostrarExamenes: true,
            mostrarMaterial: false,
            cerrarCuatrimestre: false,
            mostrarRevisionmaterial: false,
            examenId: id
        })
    }


    handleShowEstadisticas = (idExamn) => {
        this.setState({
            mostrarEst: true,
            mostrarExamenes: false,
            cerrarCuatrimestre: false,
            mostrarMaterial: false,
            mostrarRevisionmaterial: false

        })

    }

    handleShownSubirMaterial = () => {
        this.setState({
            mostrarEst: false,
            mostrarExamenes: false,
            cerrarCuatrimestre: false,
            mostrarMaterial: true,
            mostrarRevisionmaterial: false

        })
    }

    handleRevisionmaterial = () => {
        this.setState({
            mostrarEst: false,
            mostrarExamenes: false,
            mostrarMaterial: false,
            cerrarCuatrimestre: false,
            mostrarRevisionmaterial: true
        })
    }

    cerrarCuatrimestre = () => {
        this.setState({
            mostrarEst: false,
            mostrarExamenes: false,
            mostrarMaterial: false,
            mostrarRevisionmaterial: false,
            cerrarCuatrimestre: true
        })
    }

    createAlumnosNotas = () => {
        const { examen, alumnosXAula, alumnos, examenesAlumnos } = this.props
        const { aula } = this.state

        const examenesAula = examen.filter(x=> x.aula === aula && x.esPrueba);
        const unicosExamenes =  uniqBy(examenesAula, 'id_examen');

        const alumnosDeEsteAula = alumnosXAula.filter(x => x.id_aula === aula.toString());
        const cantidadExamenes = unicosExamenes.length;
        const idExamenesDeEsteAula = unicosExamenes.map(x => x.id)

        let objToFinish = [];
        let nota = 0;

        alumnosDeEsteAula.forEach(x => {
                const elAlumno = alumnos.filter(k => k.id.toString() === x.id_alumno);
                const nombre = elAlumno[0] && elAlumno[0].nombre;
                idExamenesDeEsteAula.forEach(idExamenAula => {
                    const examenAlumno = examenesAlumnos.filter(j => j.id_examen.toString() === idExamenAula.toString());
                    const exmans = examenAlumno.filter(i => i.id_alumno.toString() === x.id_alumno.toString())
                    if (exmans.length) {
                        nota = exmans[0].nota + nota
                    } else {
                        nota = nota + 1
                    }
                });
                const objFinal = {
                    nombre: nombre,
                    sumaExamenes: nota,
                    cantExamenes: cantidadExamenes,
                    asistencias: null,
                    nota_concepto: null,
                    aula: aula
                }

                objToFinish.push(objFinal)
                nota = 0
        });

        return objToFinish;
    }

    render() {
        const { guardarExamen, examenesAlumnos, cerrarCuatrimetre: cierreCuatri, aulasFinalizadas } = this.props;
        const { collapsed, mostrarEst, cerrarCuatrimestre, aula } = this.state

        const aulaCerrada = aulasFinalizadas.filter(x => x.aula === aula.toString())

        const alumnosNotas = this.createAlumnosNotas();

        return (
            <div>
                <NavBar />
                    <div className={styles.containerAulaPag}>
                        <div style={collapsed ? {width: 80} : { width: 256 }} className={styles.sider}>
                            <Menu
                                mode="inline"
                                theme="dark"
                                inlineCollapsed={this.state.collapsed}
                            >
                                <Menu.Item onClick={this.toggleCollapsed} icon={React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)} />
                                <SubMenu  icon={<DiffOutlined />} title="Examenes">
                                    <Menu.Item >
                                        <CrearExamen
                                            // idAulaExamen={this.props.location.param1.x.id}
                                            idAulaExamen={this.state.aula}
                                            guardarExamen={guardarExamen}
                                        />
                                    </Menu.Item>
                                        <SubMenu title="Revisar Examenes">
                                            { this.renderExamenesCreados() }
                                        </SubMenu>
                                    <Menu.Item onClick={() => this.handleShowEstadisticas()}>
                                        Estadisticas Examenes
                                    </Menu.Item>
                                        {/* <SubMenu  icon={<MailOutlined />} title="Estadisticas examenes">
                                            { this.renderExamenes() }
                                        </SubMenu> */}
                                </SubMenu>
                                <Menu.Item onClick={() => this.handleShownSubirMaterial()} icon={React.createElement(UploadOutlined)}>
                                        Subir Material Aula
                                </Menu.Item>
                                <Menu.Item onClick={() => this.handleRevisionmaterial()} icon={React.createElement(OrderedListOutlined)}>
                                        Revisar Material Aula
                                </Menu.Item>
                                {/* <Menu.Item onClick={() => this.cerrarCuatrimestre()} icon={<HeartIcon style={{ color: 'red' }} />}> */}
                                <Menu.Item onClick={() => this.cerrarCuatrimestre()} icon={React.createElement(CarryOutFilled)}>
                                        Cerrar cuatrimestre
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className={styles.containerRightBracket}>
                            { this.state.mostrarExamenes && this.renderExamenes()}
                            <div className={styles.containerGraphs}>
                                { this.state.mostrarEst && this.renderCharts()}
                                { this.state.mostrarMaterial && this.renderMaterial()}
                            </div>
                            { this.state.mostrarRevisionmaterial &&
                                <div className={styles.materialContainer}>
                                    { this.state.mostrarRevisionmaterial && this.renderRevisionMaterial() }
                                </div>
                            }
                            {   cerrarCuatrimestre &&
                                    <CerrarCuatrimestre
                                        cierreCuatri={cierreCuatri}
                                        alumnosNotas={alumnosNotas}
                                        aulaCerrada={aulaCerrada}
                                    >
                                    </CerrarCuatrimestre>
                            }
                        </div>
                    </div>
            </div>
        );
    }
}




export default AulaPorDentro;
