import React, { Component } from 'react';
import styles from './AulaPorDentro.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Divider, message, Card, Button, Modal, Input, Radio } from 'antd';

const { SubMenu } = Menu;

export default class CrearExamen extends React.Component {

    state = {
        visible: false,
        rta: [],
        pregunta: '',
        nombre: '',
        respuesta: '',
        preguntasExamen: [],
        valueRadio: '',
        tipoExamen: '0'
    }

    setVisible = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        })
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            rta: [],
            pregunta: '',
            nombre: '',
            respuesta: '',
            preguntasExamen: [],
            valueRadio: '',
            tipoExamen: '0'
        })
    }

    agregarRta = () => {
        const { rta, respuesta } = this.state;
        if (!respuesta) {

            message.warning('El campo respuesta esta vacio');

            return;
        }
        const newRta = [...rta, respuesta]

        this.setState({
            rta: newRta,
            respuesta: ''
        });
    }

    handleChangeRespuesta = ({ target }) => {
        this.setState({ respuesta: target.value });
    }

    handleChangePregunta = ({ target }) => {
        this.setState({ pregunta: target.value });
    }

    handleNombreChange = ({ target }) => {
        this.setState({ nombre: target.value })
    }

    handleRadioChange = e => {
        this.setState({
            valueRadio: e.target.value,
        });
    }

    handleExamenType = e => {
        this.setState({
            tipoExamen: e.target.value,
        });
    }

    agregarPregunta = () => {
        const { valueRadio, rta, tipoExamen, preguntasExamen, pregunta } = this.state;

        if (!pregunta) {
            message.error('Ingrese una pregunta');
            return;
        };

        if (!rta.length) {
            message.error('No se selecciono ninguna respuesta');
            return;
        };

        const isZero = valueRadio === 0
        if (!valueRadio && !isZero) {
            message.error('Seleccione una respuesta');
            return;
        }

        const PreguntaExamen = {
            pregunta: pregunta,
            opcionCorrecta: valueRadio,
            textoCorrecta: rta[valueRadio],
            opciones: rta
        }
        const nuevaListaPregutnas = [...preguntasExamen, PreguntaExamen]

        this.setState({
            rta: [],
            preguntasExamen: nuevaListaPregutnas,
            respuesta: '',
            pregunta: '',
            valueRadio: ''
        })
    }

    handleOk = () => {
        const { valueRadio, rta, tipoExamen, pregunta, preguntasExamen, nombre } = this.state;
        const { guardarExamen, idAulaExamen } = this.props;

        if (!nombre) {
            message.error('Ingrese un titulo/nombre de examen');
            return;
        };

        if (!preguntasExamen.length) {
            message.error('El examen no tiene preguntas agregadas');
            return;
        };

        const Examen = {
            preguntas: [...preguntasExamen],
            tipoExamen,
            aula: idAulaExamen,
            nombre: nombre,
        }


        guardarExamen(Examen);

        this.setState({
            visible: false,
            rta: [],
            preguntasExamen: [],
            respuesta: '',
            pregunta: '',
            valueRadio: ''
        })
    }

    render() {
        const { visible, rta, valueRadio, pregunta, nombre, respuesta, preguntasExamen } = this.state;


        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const agregarStyle = {
            display: 'block',
            marginTop: '15px'
        };

        return (
            <React.Fragment>
                <div onClick={() => this.setVisible(true)}>
                    Crear examen
                </div>
                    <Modal
                    centered
                    okText="Crear examen"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1000}
                    >
                        <Divider>Titulo del examen</Divider>
                        <label htmlFor="nombreExamen">Titulo/Nombre</label>
                            <Input
                                id="nombreExamen"
                                value={nombre}
                                onChange={this.handleNombreChange}
                            />
                        <Divider>Preguntas examen</Divider>
                            <label htmlFor="pregunta">Pregunta</label>
                            <Input
                                id="pregunta"
                                value={pregunta}
                                onChange={this.handleChangePregunta}
                            />
                            <label htmlFor="respuesta">Respuesta</label>
                            <Input
                                value={respuesta}
                                onChange={this.handleChangeRespuesta}
                                id="respuesta"
                            />
                            <div style={agregarStyle}>
                            <Button onClick={this.agregarRta}> Agregar Respuesta </Button>
                            </div>
                            <Radio.Group onChange={this.handleRadioChange} value={valueRadio}>
                                {rta.map((x, index) => {
                                    return (
                                    <Radio key={index} value={index} style={radioStyle} className={styles.possibleAnswer}> {x} </Radio>
                                    )
                                })}
                            </Radio.Group>
                            <div>
                            {rta.length > 0 && <h4> Recuerde seleccionar al menos una respuesta correcta! </h4> }
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button type="primary" onClick={this.agregarPregunta}> Agregar pregunta </Button>
                            <span style={{ fontWeight: 900, marginLeft: '15px'}}> {preguntasExamen.length} Preguntas dentro del examen </span>
                            </div>
                        <br></br>
                        <div style={{marginTop: '15px'}}>
                        <Divider>Opciones examen</Divider>
                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                <Radio.Group name="radiogroup" onChange={this.handleExamenType} defaultValue={0}>
                                    <Radio value={0}>Examen de prueba</Radio>
                                    <Radio value={1}>Examen con nota</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                    </Modal>
                </React.Fragment>
        )
    }
}
