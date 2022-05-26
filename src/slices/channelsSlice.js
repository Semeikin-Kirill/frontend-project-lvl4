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
  reducers: {
    currentСhannelChanged(state, action) {
      state.currentChannelId = action.payload;
    },
    channelAdded(state, action) {
      const channel = action.payload;
      state.channels = [...state.channels, channel];
      state.currentChannelId = channel.id;
    },
    removedChannel(state, action) {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.currentChannelId = state.currentChannelId === id ? 1 : state.currentChannelId;
    },
    renamedChannel(state, action) {
      const { id: channelId, name } = action.payload;
      const channel = state.channels.find(({ id }) => id === channelId);
      channel.name = name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
    });
  },
});

export const selectorChannels = (state) => state.channels;

export const {
  currentСhannelChanged, channelAdded, removedChannel, renamedChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
