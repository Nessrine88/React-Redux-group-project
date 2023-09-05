
import { legacy_createStore as createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';

import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
