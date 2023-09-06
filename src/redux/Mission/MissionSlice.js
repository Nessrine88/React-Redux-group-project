import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch missions');
  }
});

const initialState = {
  missions: [],
};

const missionSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    toggleJoinLeaveMember: (state, action) => {
      const missionIdToToggle = action.payload;

      state.missions = state.missions.map((mission) => {
        if (mission.mission_id === missionIdToToggle) {
          const newStatus =
            mission.status === 'Active Member' ? 'Not A Member' : 'Active Member';

          return {
            ...mission,
            status: newStatus,
          };
        }
        return mission;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.fulfilled, (state, action) => {
      state.missions = action.payload;
    });
  },
});

export const { toggleJoinLeaveMember } = missionSlice.actions;
export default missionSlice.reducer;
