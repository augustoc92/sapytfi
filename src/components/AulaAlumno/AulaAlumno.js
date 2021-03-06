import React, { Component } from 'react';
import styles from './AulaAlumno.module.css';
import NavBar from '../Shared/NavBar';
import { Button, Modal, Input, Radio,
    Menu, Card } from 'antd';
import SubirMaterial from './FileUpload';
import MaterialAula from './MaterialAula';
import { Link } from "react-router-dom";
import { uniqBy } from 'lodash';
import {
    AppstoreOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    DiffOutlined,
    OrderedListOutlined,
    ContactsOutlined
} from '@ant-design/icons';
import ExamenComp from './Examen';
import RadioPreguntasGroup from './radioPreguntasGroup';
import { groupBy, map } from 'lodash';


const { Meta } = Card;

const { SubMenu } = Menu;
class AulaAlumno extends Component {

    state = {
        collapsed: false,
        aula: 0,
        showUpload: false,
        showMaterial: false,
    }
    componentDidMount() {
        const { getExamen, getMaterialAula, getExamenNota } = this.props;

        this.setState({
            aula:  this.props.location.param1.x.id
            // aula: 25
        })

        getExamen();
        getMaterialAula();
        getExamenNota();
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    splitExamenes = () => {
        const { examen, examenesAlumnos, userObj } = this.props;
        const { aula } = this.state;
        const examenesDeLAula = examen.filter(x => x.aula === aula);
        const noRepetidos = uniqBy(examenesDeLAula, 'id_examen')

        const examenesdQueNoTomo = noRepetidos.filter(x => {
            if (examenesAlumnos.length) {
                for (let i = 0; i < examenesAlumnos.length; i++) {
                    if (userObj.id === examenesAlumnos[i].id_alumno) {
                        if (x.id_examen === examenesAlumnos[i].id_examen.toString()) {
                            return false;
                        }
                    }
                    return true;
                }
            }
            return true;
        })


        return examenesdQueNoTomo;
    }

    renderMaterial = () => {
        const { userObj, guardarMaterial } = this.props

        return <SubirMaterial aula={this.state.aula} guardarMaterial={guardarMaterial} user={userObj.id}/>
    }

    renderRevisionMaterial = () => {
        const { aula } = this.state
        const { deleteFile, userObj } = this.props;

        const filtradoXAula = this.props.material.filter(x => x.aula === aula)

        return <MaterialAula data={filtradoXAula}  user={userObj.id} deleteFile={deleteFile}/>
    }

    handleShownSubirMaterial = () => {
        this.setState({
            showUpload: true,
            showMaterial: false
        })
    }

    handleRevisionmaterial = () => {
        this.setState({
            showUpload: false,
            showMaterial: true
        })
    }

    render() {
        const { examen, intentoExamen, tomarExamen, userObj, examenesAlumnos } = this.props;
        const { collapsed, aula } = this.state
        const examenesDelAula = this.splitExamenes();

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
                                        {
                                            examenesDelAula.map(exam =>
                                                {
                                                    return (
                                                        <Menu.Item>
                                                            <ExamenComp
                                                                examen={examen}
                                                                idExamen={exam.id_examen}
                                                                intentoExamen={intentoExamen}
                                                                tomarExamen={tomarExamen}
                                                                userObj={userObj}
                                                                aula={aula}
                                                                examenesAlumnos={examenesAlumnos}
                                                            />
                                                        </Menu.Item>
                                                )
                                            }
                                                )
                                        }
                                    </SubMenu>
                                    <Menu.Item onClick={() => this.handleShownSubirMaterial()} icon={React.createElement(UploadOutlined)}>
                                        Subir Material Aula
                                    </Menu.Item>
                                    <Menu.Item onClick={() => this.handleRevisionmaterial()} icon={React.createElement(OrderedListOutlined)}>
                                        Revisar Material Aula
                                    </Menu.Item>
                                </Menu>
                            </div>
                            <div className={styles.containerRightBracket}>
                                <div className={styles.containerGraphs}>
                                { this.state.showUpload && this.renderMaterial()}
                                </div>
                                { this.state.showMaterial &&
                                    <div className={styles.materialContainer}>
                                        { this.renderRevisionMaterial() }
                                    </div>
                                }
                            </div>
                        </div>
                    <div className={styles.containerAula}>


                    </div>
            </div>
        );
    }
}

export default AulaAlumno;
