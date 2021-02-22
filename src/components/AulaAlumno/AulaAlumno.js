import React, { Component } from 'react';
import styles from './AulaAlumno.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card, Button, Modal, Input, Radio } from 'antd';
import { Link } from "react-router-dom";
import RadioPreguntasGroup from './radioPreguntasGroup';

const { Meta } = Card;

const { SubMenu } = Menu;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class AulaAlumno extends Component {

    componentDidMount() {
        const { getExamen } = this.props;

        getExamen();
    }


    handleRadioChange = e => {
        this.setState({
            valueRadio: e.target.value,
        });
    }

    state = {
        visible: false,
        preguntas: []
    }

    setVisible = (vis) => {
        this.setState({
            visible: vis
        })
    }

    handleOk = () => {

    }

    armarExamen = (elemen, indx) => {
        return (
            <RadioPreguntasGroup elementos={elemen} indice={indx} ></RadioPreguntasGroup>
        )
    }



    render() {
        console.log('this.props', this.props);
        const { visible } = this.state;
        const { examen } = this.props;

        console.log('examen', examen);
            // aula: "3"
            // esPrueba: false
            // id: 6
            // id_examen: "10"
            // posibles_rtas: "Si!-Re contra si che!-Me encanto!-De lo mejor del 2020! <3"
            // pregunta: "Esta bueno appLicados?"
            // respuesta: "3"
            // titulo: "Matemoto"

        return (
            <div>
                <NavBar>
                </NavBar>
                    <div className={styles.containerAula}>
                        <Button type="primary" onClick={() => this.setVisible(true)}>
                            Tomar Examen
                        </Button>
                        <Modal
                            title="Matemoto"
                            centered
                            okText="Entregar examen"
                            visible={visible}
                            onOk={this.handleOk}
                            onCancel={() => this.setVisible(false)}
                            width={1000}
                        >
                        <div> Tiene todos los intentos que quiera para responder las siguientes preguntas </div>
                        { examen.map((element, index) => {
                            return this.armarExamen(element,index);
                        })}
                        </Modal>
                    </div>
            </div>
        );
    }
}

export default AulaAlumno;
