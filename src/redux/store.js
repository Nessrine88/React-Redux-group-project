import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import Missionreducer from './Mission/MissionSlice';
import rocketsReducer from './rockets/rocketsSlice';
import dragonReducer from './dragons/dragonsSlice';

const store = configureStore({
  reducer: {
    missions: Missionreducer,
    rockets: rocketsReducer,
    dragons: dragonReducer,
  },
  middleware: [...applyMiddleware(), logger],
});

export default store;
