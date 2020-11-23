import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import login from './login/reducer';
import materia from './materia/reducer';
import ui from './ui/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  materia,
  ui,
  login,
});

export default rootReducer;
