import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import login from './login/reducer';
import materia from './materia/reducer';
import alumno from './alumno/reducer';
import aula from './aula/reducer';
import carrera from './carrera/reducer';
import profesor from './profesor/reducer';
import ui from './ui/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  alumno,
  carrera,
  aula,
  materia,
  profesor,
  ui,
  login,
});

export default rootReducer;
