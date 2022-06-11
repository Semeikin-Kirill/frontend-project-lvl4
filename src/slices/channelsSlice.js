import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../routes.js';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  (header) => axios.get(routes.getData(), header).then((req) => req.data).catch(() => toast.error('Ошибка при загрузке данных')),
);

const initialState = { currentChannelId: null, channels: [] };

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    currentСhannelChanged(state, action) {
      const nextState = state;
      nextState.currentChannelId = action.payload;
    },
    channelAdded(state, action) {
      const channel = action.payload;
      const nextState = state;
      nextState.channels = [...state.channels, channel];
      nextState.currentChannelId = channel.id;
    },
    removedChannel(state, action) {
      const { id } = action.payload;
      const nextState = state;
      nextState.channels = state.channels.filter((channel) => channel.id !== id);
      nextState.currentChannelId = state.currentChannelId === id ? 1 : state.currentChannelId;
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
      const nextState = state;
      nextState.channels = channels;
      nextState.currentChannelId = currentChannelId;
    });
  },
});

export const selectorChannels = (state) => state.channels;

export const {
  currentСhannelChanged, channelAdded, removedChannel, renamedChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
