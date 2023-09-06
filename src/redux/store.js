import { configureStore } from '@reduxjs/toolkit';
import Missionreducer from './Mission/MissionSlice';

const store = configureStore({
  reducer: {
    missions: Missionreducer,
  },
});

export default store;
