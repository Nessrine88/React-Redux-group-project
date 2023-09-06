import { configureStore } from '@reduxjs/toolkit';
import Missionreducer from './Mission/MissionSlice';
import rocketsReducer from './rockets/rocketsSlice';

const store = configureStore({
  reducer: {
    missions: Missionreducer,
    rockets: rocketsReducer,
  },
});

export default store;
