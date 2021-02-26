import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './LoginForm.module.css'
import { getAlumno } from '../../redux/modules/alumno/action';

class LoginForm extends React.Component {

    state = {
        errorMessage: ''
    }

    componentDidMount() {
        const { getProfesor, getAlumno } = this.props;

        getAlumno();
        getProfesor();
    }

    onFinish = values => {
        const { profesor, alumno, loggear } = this.props;

        if (values.usuario === 'admin') {
            loggear({usuario: 'admin', permisos: '0'})
            this.props.history.push('./home')
        }
        const usuarioEsAlumno = alumno.filter(x => x.email.toString() === values.usuario)
        const usuarioEsProfesor = profesor.filter(x => x.email.toString() === values.usuario)

        if (usuarioEsProfesor && usuarioEsProfesor[0]) {
            if (usuarioEsProfesor[0].password !== values.contraseña) {
                this.setState({
                    errorMessage: 'La contraseña no es correcta'
                });
                return;
            }
            loggear({usuario: usuarioEsProfesor[0].nombre, permisos: '1'}, usuarioEsProfesor[0])
            this.props.history.push('./home')
        } else if (usuarioEsAlumno && usuarioEsAlumno[0]) {
            if (usuarioEsAlumno[0].password !== values.contraseña) {
                this.setState({
                    errorMessage: 'La contraseña no es correcta'
                });
                return;
            }
            loggear({usuario: usuarioEsAlumno[0].nombre, permisos: '2'}, usuarioEsAlumno[0])
            this.props.history.push('./home')
        }
    };


    render() {
        const { errorMessage } = this.state;

        return (
            <div className={styles.container}>
                <Form
                    size='large'
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    >
                    <Form.Item
                        name="usuario"
                        rules={[
                        {
                            required: true,
                            message: 'Ingrese su nombre de usuario',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
                    </Form.Item>
                    <Form.Item
                        name="contraseña"
                        rules={[
                        {
                            required: true,
                            message: 'Ingrese contraseña!',
                        },
                        ]}
                    >
                        <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="contraseña"
                        placeholder="Contraseña"
                        />
                    </Form.Item>
                    <br></br>
                    { errorMessage &&
                        <label className={styles.errorMessage}> {errorMessage} </label>
                    }
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Recordarme</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="">
                            Olvide Contraseña
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Iniciar session
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
};

export default LoginForm;
