import React from 'react';
import { Progress } from 'antd';
import NavBar from '../Shared/NavBar';

class Home extends React.Component{
    render() {
        return(
            <div>
                <NavBar>
                </NavBar>
                    <Progress percent={30} />
                    <Progress percent={50} status="active" />
                    <Progress percent={70} status="exception" />
                    <Progress percent={100} />
                    <Progress percent={50} showInfo={false} />
            </div>
        )

    }
}

export default Home;
