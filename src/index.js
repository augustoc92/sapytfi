import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from '../src/components/Form';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Route, Switch } from 'react-router';
import Form from './components/Form';
import Home from './components/Home';
import antd from './antd.css';

// TODO Cambiar Login por APP

const customHistory = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
   <Router history={customHistory}>
    <Login>
      <Switch>
        <Route exact path="/login" component={Form} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Login>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
