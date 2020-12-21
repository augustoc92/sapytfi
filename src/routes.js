import React from 'react';
import { Route, Switch } from 'react-router';
import App from './components/App';
import Login from './components/Login';
import Home from './components/Home';
import Subject from './components/Subject';
import Carrera from './components/Carrera';
import Alumno from './components/Alumno';
import Profesor from './components/Profesor';
import Aula from './components/Aula';
import VistaAulas from './components/VistaAulas';
import AulaPorDentro from './components/AulaPorDentro'

const Routes = () => {
    return (
        <App>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/subject" component={Subject} />
                <Route exact path="/carrera" component={Carrera} />
                <Route exact path="/alumno" component={Alumno} />
                <Route exact path="/profesor" component={Profesor} />
                <Route exact path="/aula" component={Aula} />
                <Route exact path="/vistaaulas" component={VistaAulas} />
                <Route exact path="/aulapordentro" component={AulaPorDentro} />
                <Route exact path="/" component={Login} />
                <Route path="/" component={Login} />
            </Switch>
        </App>
    )
};

export default Routes;
