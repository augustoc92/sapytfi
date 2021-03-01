import React, { Component } from 'react';
import styles from './AulaPorDentro.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card, Button, Modal, Input, Radio } from 'antd';

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

    agregarRta = () => {
        const { rta, respuesta } = this.state;
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
                    title="Examen"
                    centered
                    okText="Crear examen"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={() => this.setVisible(false)}
                    width={1000}
                    >
                        <label htmlFor="nombreExamen">Nombre</label>
                            <Input
                                id="nombreExamen"
                                value={nombre}
                                onChange={this.handleNombreChange}
                            />
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
                        <Button style={agregarStyle} onClick={this.agregarRta}> Agregar Respuesta </Button>
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
                        <div> {preguntasExamen.length} Preguntas dentro del examen </div>
                        <br></br>
                        <Button type="primary" onClick={this.agregarPregunta}> Agregar otra pregunta </Button>
                        <div style={{marginTop: '15px'}}>
                            <Radio.Group name="radiogroup" onChange={this.handleExamenType} defaultValue='prueba'>
                                <Radio value={0}>Examen de prueba</Radio>
                                <Radio value={1}>Examen con nota</Radio>
                            </Radio.Group>
                        </div>
                    </Modal>
                </React.Fragment>
        )
    }
}
