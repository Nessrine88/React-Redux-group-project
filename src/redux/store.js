import { configureStore } from '@reduxjs/toolkit';
import Missionreducer from './Mission/MissionSlice';
import rocketsReducer from './rockets/rocketsSlice';
import dragonReducer from './dragons/dragonsSlice';

const store = configureStore({
  reducer: {
    missions: Missionreducer,
    rockets: rocketsReducer,
    dragons: dragonReducer,
  },
});

export default store;
