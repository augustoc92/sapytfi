import React from 'react';
import { Upload, Button,Input, InputNumber,  Collapse } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Base64 } from 'js-base64';
import FileUpload from './FileUpload';
import styles from './AulaPorDentro.module.css'

const { Panel } = Collapse;

export default class NotaAlumnoPanel extends React.Component {

    state = {
        notaConcepto: 0
    }

    renderHeader = () => {
        const { data } = this.props;
        const { notaConcepto } = this.state;

        if (notaConcepto) {
            return (
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <span style={{width: '30%', textAlign: 'center', color: "black", fontWeight: '600'}}> {data.nombre} </span>
                    <span style={{width: '30%', textAlign: 'center', color: "green", fontWeight: '600'}}>
                        Nota final { notaConcepto }
                    </span>
                </div>
            )
        } else {
            return (
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <span style={{width: '30%', textAlign: 'center', color: "black", fontWeight: '600'}}> {data.nombre} </span>
                    <span style={{width: '30%', textAlign: 'center', color: "red", fontWeight: '600'}}>
                        Pendiente de nota de concepto
                    </span>
                </div>
            )
        }
    }

    handleChange = (e) => {
        const { data, createObjCerrarCuatrimstre } = this.props;
        const cantidadExamenes = data.cantExamenes;

        const notaFinal = (e + data.sumaExamenes)/ (cantidadExamenes + 1)

        const trimmed = notaFinal.toFixed(2);

        const objToSend = {
            nombre: data.nombre,
            cantExamenes: cantidadExamenes,
            notaSumaExamenes: data.sumaExamenes,
            asistencias: data.asistencias,
            aula: data.aula,
            notaConcepto: e,
            notaFinal: trimmed
        }
        this.setState({
            notaConcepto: trimmed
        })

        createObjCerrarCuatrimstre(objToSend)
    }

    render() {
        const { data } = this.props;
        const keyToUse = data.id

        return (
            <Collapse accordion defaultActiveKey={[keyToUse]} bordered={true}>
                <Panel header={this.renderHeader()} key={data.id} className={styles.panelNotas}>
                    <div className={styles.contenedorNota}>
                        <label className={styles.itemNota}> Sumatoria notas examenes </label>
                        <span className={styles.itemNota}> {data.sumaExamenes} </span>
                    </div>
                    {/* <div className={styles.contenedorNota} style={{marginTop: '10px'}}>
                        <label className={styles.itemNota}> Asistencias </label>
                        <span className={styles.itemNota}> {data.asistencias} </span> */}
                    {/* </div> */}
                    <div className={styles.contenedorNota} style={{marginTop: '10px'}}>
                        <label className={styles.itemNota}> Nota Concepto </label>
                        <InputNumber
                            className={styles.itemNota}
                            onChange={this.handleChange}
                            max={10}
                            min={0}
                        />
                    </div>
                </Panel>
            </Collapse>
        );
    }
}

