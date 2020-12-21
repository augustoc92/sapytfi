import { Menu, Avatar, Layout } from 'antd';
import { Link } from "react-router-dom";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';

const { SubMenu } = Menu;
const { Header } = Layout;

class NavBar extends React.Component {
  state = {
    current: 'home',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };



  render() {
    const { current } = this.state;
    const { user } = this.props;
    const { permisos } = user;

    const isAdmin = permisos === '0';
    const isProfe = permisos === '1';
    const isAlumno = permisos === '2';

    return (
      <Layout className="layout">
        <Header style={{ display: 'flex', justifyContent: 'space-between', padding: '0 50px 0 0'}}>
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" theme='dark'>
            <Menu.Item key="mail" icon={<MailOutlined />}>
              <Link to="/home">
              Novedades
              </Link>
            </Menu.Item>
            <Menu.Item key="app" icon={<AppstoreOutlined />}>
              {/* SOLO SI ES ADMIN TIENE CONTROL DE TODAS ALS AULAS */}
              { isAdmin &&
                <Link to="/aula">
                  Aulas admin
                </Link>
              }
              {/* Si es alumno entra al aula como alumno */}
              {  isAlumno &&
                <Link to='/vistaaulas'>
                  Aulas alumno
                </Link>
              }
              {/* Si es profesor entra al aula como profesor */}
              { isProfe &&
                <Link to='vistaaulas'>
                  Aula profesores
                </Link>
              }
            </Menu.Item>

            {/* MENU ADMINISTRADOR */}

            <SubMenu icon={<SettingOutlined />} title="Administracion" disabled={!isAdmin}>
              <Menu.ItemGroup title="Cursado">
              <Menu.Item key="cursado:1">
                <Link to="/Profesor">
                    Profesores
                </Link>
              </Menu.Item>
              <Menu.Item key="cursado:2">
                <Link to="/Alumno">
                    Alumnos
                </Link>
              </Menu.Item>
                <Menu.Item key="setting:1">
                <Link to="/Carrera">
                    Carreras
                  </Link>
                </Menu.Item>
                <Menu.Item key="setting:2">
                  <Link to="/Subject">
                    Materias
                  </Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup title="Ciclo Lectivo">
                <Menu.Item key="setting:3">Calendario Academicos</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
          <Link to="/Usuario">
          <Avatar
              style={{
                  backgroundColor: '#00a2ae',
                  verticalAlign: 'middle',
                  alignSelf: 'center'
                }}
                size="large"
                gap={4}
            >
              {this.props.user && this.props.user.usuario}
          </Avatar>
          </Link>
        </Header>
      </Layout>
    );
  }
}

export default NavBar;
