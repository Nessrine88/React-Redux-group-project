import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://api.spacexdata.com/v4/dragons';

export const fetchDragons = createAsyncThunk('dragons/fetchDragons', async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data.map((dragon) => ({ ...dragon, reserved: false }));
  } catch (error) {
    throw new Error('Failed to fetch dragons');
  }
});

const initialState = {
  dragons: [],
};

const dragonsSlice = createSlice({
  name: 'dragons',
  initialState,
  reducers: {
    reserveDragon: (state, action) => {
      const { id } = action.payload;
      const dragon = state.dragons.find((dragon) => dragon.id === id);
      if (dragon) {
        dragon.reserved = true;
      }
    },
    cancelDragonReservation: (state, action) => {
      const { id } = action.payload;
      const dragon = state.dragons.find((dragon) => dragon.id === id);
      if (dragon) {
        dragon.reserved = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDragons.fulfilled, (state, action) => {
      state.dragons = action.payload;
    });
  },
});

export const { reserveDragon, cancelDragonReservation } = dragonsSlice.actions;

export default dragonsSlice.reducer;

export const selectDragons = (state) => state.dragons.dragons;
