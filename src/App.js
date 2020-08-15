import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import styles from './App.module.css';


// TODO Agregar el manejo de estado de rutas ( State push route (google) )
// Enviar como primer ruta al login ,
// despues eso se puede manejar si el usuario ya estuvo logeado.

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
