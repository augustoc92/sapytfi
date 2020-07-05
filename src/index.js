import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import { Route, Switch } from 'react-router';
import Form from './components/Form';
import Home from './components/Home';

const customHistory= createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
   <Router history={customHistory}>
    <App>
      <Switch>
        <Route exact path="/login" component={Form} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </App>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
