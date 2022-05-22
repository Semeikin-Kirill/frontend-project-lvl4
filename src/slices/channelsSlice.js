import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDataUrl } from './routes.js';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  (header) => axios.get(getDataUrl(), header).then((req) => req.data),
);

const initialState = { currentChannelId: null, channels: [] };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.channels = state.channels.concat(channels);
      state.currentChannelId = currentChannelId;
    });
  },
});

export const selectorChannels = (state) => state.channels;

export default channelsSlice.reducer;
