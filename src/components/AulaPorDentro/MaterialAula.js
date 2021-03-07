import React from 'react';
import { Upload, Button, List, Skeleton, Avatar, Card } from 'antd';
import { UploadOutlined, ZoomInOutlined, SettingOutlined, EllipsisOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Base64 } from 'js-base64';
import FileUpload from './FileUpload';

export default class SubirMaterial extends React.Component{
    openFile = (aula, nombre) => {
        window.open(`http://localhost:8080/${aula}/${nombre}`);
    }

    render() {
        const { data, deleteFile } = this.props;

        return (
            <div style={{width: '100%', marginTop: '20px', marginLeft: '20px'}}>
                <List
                    className="demo-loadmore-list"
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                title={item.nombre}
                                actions={[
                                    <ZoomInOutlined key="Revisar" onClick={() => this.openFile(item.aula, item.nombre)} />,
                                    <DeleteOutlined key="Eliminar" onClick={() => deleteFile(item.id, item)} />,
                                ]}
                            >
                                { console.log('http://localhost:8080/${item.aula}/${item.nombre}', `http://localhost:8080/${item.aula}/${item.nombre}`)}
                            <iframe style={{width: '100%'}} id={item.id} src={`http://localhost:8080/${item.aula}/${item.nombre}`}></iframe> </Card>
                        </List.Item>
                    )}
                />
            </div>

        );
    }
}
