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

        for (i = 0; i < copyArray.length; i++) {
            if (copyArray[i].nombre === obj.nombre) {
                copyArray.splice(i, 1)
            }
        }

        copyArray = [...copyArray, obj];

        this.setState({
            objCerrarCuatrimestre: [...copyArray]
        })
    }

    cerrarCuatrimestre = () => {
        const { cierreCuatri } = this.props
        const { objCerrarCuatrimestre } = this.state;



        if (objCerrarCuatrimestre.length === this.props.alumnosNotas.length) {
            cierreCuatri(objCerrarCuatrimestre)
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
        const { aulaCerrada } = this.props;
        const { procesoIniciado, cuatrimestreCerrado } = this.state;

        console.log('AULA CERRADA', aulaCerrada)

        return (
            <div className={styles.containerPaneles}>
                { !aulaCerrada.length && this.iniciarProceso()}
                {
                    !aulaCerrada.length && procesoIniciado && this.ponerNotaAlumno()
                }
                { procesoIniciado &&
                    <div style={{width: '100%', marginTop: '4%', alignContent: 'center', display: 'flex', justifyContent: 'center'}}>
                        <Button type="primary" onClick={this.cerrarCuatrimestre}> Cerrar cuatrimestre </Button>
                    </div>
                }
                {
                    (aulaCerrada.length > 0 || cuatrimestreCerrado) &&
                    <Table
                        columns={columns}
                        dataSource={aulaCerrada}
                />
                }
            </div>
        );
    }
}



const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre'
    },
    {
        title: 'Cantidad examenes',
        dataIndex: 'cantExamenes',
    },
    {
        title: 'Sumatoria notas',
        dataIndex: 'sumaNotas',
    },
    {
        title: 'Concepto',
        dataIndex: 'notaConcepto',
    },
    {
        title: 'Nota Final',
        dataIndex: 'nota_final',
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