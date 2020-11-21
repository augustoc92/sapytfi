import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import antd from './antd.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from './routes';
import configureStore from './store';
import { Route, Switch } from 'react-router';

const store = configureStore();
const customHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

export default customHistory;

