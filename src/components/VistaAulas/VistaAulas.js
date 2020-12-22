import React, { Component } from 'react';
import styles from './VistaAulas.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

const { SubMenu } = Menu;

class VistaAulas extends Component {
    render() {

    const { user } = this.props;
    const { permisos } = user;

    const isProfe = permisos === '1';
    const isAlumno = permisos === '2';

        return (
            <div>
                <NavBar>
                </NavBar>
                    <div className={styles.containerAula}>
                        <Link to={isProfe ? "./aulapordentro" : "./aulaalumno"}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src="https://i.ytimg.com/vi/Kp2bYWRQylk/maxresdefault.jpg" />}
                            >
                                <Meta title="Math Classroom" description="Todos los lunes 12:00" />
                            </Card>
                        </Link>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://image.jimcdn.com/app/cms/image/transf/none/path/s799506142364285d/image/i699979539c37e171/version/1526958582/image.jpg" />}
                        >
                            <Meta title="E = Mc2" description="Horario" />
                        </Card>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://i0.wp.com/www3.gobiernodecanarias.org/medusa/edublog/ieselgaleon/wp-content/uploads/sites/22/2020/06/descarga.jpg?resize=366%2C212" />}
                        >
                            <Meta title="Aula Magna" description="Horario" />
                        </Card>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://t1.pb.ltmcdn.com/es/posts/7/9/8/la_quimica_del_amor_existe_una_formula_cientifica_4897_600.jpg" />}
                        >
                            <Meta title="La tabla periodica" description="Horario" />
                        </Card>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://valeripiu.files.wordpress.com/2016/03/english.jpg?w=616&h=278&crop=1" />}
                        >
                            <Meta title="Only english here" description="Horario" />
                        </Card>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2019/03/lenguajes_programacion_odiados_amados_2019.jpg?itok=N85E5HTT" />}
                        >
                            <Meta title="1 Home 2 Sweet GoTo 1" description="Horario" />
                        </Card>
                    </div>
            </div>
        );
    }
}

export default VistaAulas;
