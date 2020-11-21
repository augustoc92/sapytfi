import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from './App.module.css';


class App extends Component {
  render() {
    return (
      <div className={styles.AppContainer}>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
