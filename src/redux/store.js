import { legacy_createStore as createStore} from 'redux'
import logger from 'redux-logger';
import rootReducer from './reducers';

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
