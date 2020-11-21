import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './redux/modules'
import { loadState, saveState } from './redux/localStorage';

export default function configureStore() {
  const persistedState = loadState();

  const enhancer =  composeWithDevTools(
    applyMiddleware(thunk)
  );

  const store = createStore(rootReducer, persistedState, enhancer);

  store.subscribe(() => {
    saveState(store.getState())
  });

  return store;
}
