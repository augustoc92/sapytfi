export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToSave = {
      login: state.login
    };

    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem('state', serializedState);
  } catch {
    console.log('Unable to save state in localStorage');
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.setItem('state', undefined);
  } catch {
    console.log('Unable to clear localStorage');
  }
};
