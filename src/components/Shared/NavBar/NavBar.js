import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';

const { SubMenu } = Menu;

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
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" theme='dark'>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          <Link to="/Home">
          Novedades
          </Link>
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Aulas
        </Menu.Item>
        <SubMenu icon={<SettingOutlined />} title="Administracion">
          <Menu.ItemGroup title="Cursado">
            <Menu.Item key="setting:1">Carrera</Menu.Item>
            <Menu.Item key="setting:2">Materias</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Ciclo Lectivo">
            <Menu.Item key="setting:3">Calendario Academicos</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}

export default NavBar;
