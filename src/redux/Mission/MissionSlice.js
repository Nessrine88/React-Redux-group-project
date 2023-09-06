import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://api.spacexdata.com/v3/missions';

// Async thunk to fetch missions
export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch missions');
  }
});

// Initial state for missions
const initialState = {
  missions: [], // You want to store missions in an array
};

// Create a mission slice
const missionSlice = createSlice({
  name: 'missions', // This should be 'missions' instead of 'Mission'
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.missions = action.payload; // Update the missions array with the fetched data
      })
      .addCase(fetchMissions.rejected, () => {
        // Handle the error state if needed
      });
  },
});

export default missionSlice.reducer; // Export the reducer
