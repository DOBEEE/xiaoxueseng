import { createStore } from 'redux';
import rootReducer from './reducers/index';

// Apply middleware here
// ...

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);
  return store;
}