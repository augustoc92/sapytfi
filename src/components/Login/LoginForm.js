import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './LoginForm.module.css'

class LoginForm extends React.Component {
    onFinish = values => {
        this.props.history.push('./home')
    };


    render() {
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
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="contraseña"
                        placeholder="Contraseña"
                        />
                    </Form.Item>
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
