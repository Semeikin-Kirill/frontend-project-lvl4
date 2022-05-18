import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDataUrl } from './routes.js';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  (header) => axios.get(getDataUrl(), header).then((req) => req.data),
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ currentChannelId: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { channels, currentChannelId } = action.payload;
      channelsAdapter.setAll(state, channels);
      state.currentChannelId = currentChannelId;
    });
  },
});

export const selectorsChannels = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
