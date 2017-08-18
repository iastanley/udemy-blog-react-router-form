import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise'; // temporary
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(promise));

export default store;
