import React from 'react';
import { Upload, Button, Form, Input, Collapse, message, Table } from 'antd';
import { UploadOutlined, UserOutlined, LockOutlined} from '@ant-design/icons';
import NotaAlumnoPanel from './NotaAlumnoPanel'
import styles from './AulaPorDentro.module.css'


const { Panel } = Collapse;

export default class CerrarCuatrimestre extends React.Component{

    state = {
        procesoIniciado: false,
        cuatrimestreCerrado: false,
        objCerrarCuatrimestre: [],
    }

    handleIniciarProceso = () => {
        this.setState({
            procesoIniciado: true
        })
    }

    createObjCerrarCuatrimstre = (obj) => {
        const { objCerrarCuatrimestre } = this.state;

        // Check obj already in array
        let i;
        let copyArray = objCerrarCuatrimestre

        if (copyArray.length === 0 ) {
            copyArray.push(obj);
            return;
        }
        for (i = 0; i < copyArray.length; i++) {
            if (copyArray[i].id === obj.id) {
                copyArray.splice(i, 1)
            }
        }

        copyArray.push(obj);

        this.setState({
            objCerrarCuatrimestre: [...copyArray]
        })
    }

    cerrarCuatrimestre = () => {
        const { objCerrarCuatrimestre } = this.state;

        if (objCerrarCuatrimestre.length === this.props.alumnosNotas.length) {
            message.success('Se cargaron las notas del cuatrimestre');
            this.setState({
                cuatrimestreCerrado: true,
                procesoIniciado: false
            })

        } else {
            message.warning('Faltan poner notas de concepto');
        }
    }

    iniciarProceso = () => {
        const { procesoIniciado, cuatrimestreCerrado } = this.state;

        if (procesoIniciado === false && cuatrimestreCerrado === false) {
            return (
                <div className={styles.probandoContainer}>
                    <h1>
                        Se comenzara el proceso de terminado de cuatrimestre, esta de acuerdo?
                    </h1>
                    <h3>
                        El proceso consiste en analizar las notas una por una de los alumnos para definir su promedio
                    </h3>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" onClick={this.handleIniciarProceso}> Si, continuemos </Button>
                    </div>
                </div>
            )
        }
    }

    ponerNotaAlumno = () => {
        const { alumnosNotas } = this.props;

        return alumnosNotas.map(x => (
            <NotaAlumnoPanel
                createObjCerrarCuatrimstre={this.createObjCerrarCuatrimstre}
                data={x}
            />
        ))
    }

    render() {
        const { procesoIniciado, cuatrimestreCerrado } = this.state;

        return (
            <div className={styles.containerPaneles}>
                {this.iniciarProceso()}
                {
                    procesoIniciado && this.ponerNotaAlumno()
                }
                { procesoIniciado &&
                    <div style={{width: '100%', marginTop: '4%', alignContent: 'center', display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" onClick={this.cerrarCuatrimestre}> Cerrar cuatrimestre </Button>
                    </div>
                }
                {
                    cuatrimestreCerrado &&
                    <Table
                        columns={columns}
                        dataSource={tableData}
                />
                }
            </div>
        );
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
        title: 'Cantidad examenes',
        dataIndex: 'cantidad',
    },
    {
        title: 'Sumatoria notas',
        dataIndex: 'sumatoria',
    },
    {
        title: 'Concepto',
        dataIndex: 'concepto',
    },
    {
        title: 'Asistencias %',
        dataIndex: 'asistencia',
    },
    {
        title: 'Nota Final',
        dataIndex: 'final',
    }
];

const tableData = [
    {
        id: 1,
        nombre: 'Tito',
        cantidad: 2,
        sumatoria: 15,
        concepto: 7,
        asistencia: 70,
        final: 8
    },
    {
        id: 2,
        nombre: 'Juli',
        cantidad: 2,
        sumatoria: 20,
        concepto: 9,
        asistencia: 90,
        final: 10
    },
    {
        id: 3,
        nombre: 'Pepe',
        cantidad: 2,
        sumatoria: 8,
        concepto: 4,
        asistencia: 20,
        final: 3
    }
]