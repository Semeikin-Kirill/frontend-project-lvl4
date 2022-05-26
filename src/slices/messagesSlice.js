import { createSlice } from '@reduxjs/toolkit';
import { has } from 'lodash';
import { fetchData, removedChannel } from './channelsSlice.js';

const initialState = {};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageAdded: (state, action) => {
      const message = action.payload;
      const { channel } = message;
      state[channel] = has(state, channel) ? [...state[channel], message] : [message];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messages.forEach((message) => {
        const { channel } = message;
        state[channel] = has(state, channel) ? [...state[channel], message] : [message];
      });
    })
      .addCase(removedChannel, (state, action) => {
        const { id } = action.payload;
        delete state[id];
      });
  },
});

export const selectorMessages = (state) => state.messages;

export const { messageAdded } = messagesSlice.actions;

export default messagesSlice.reducer;
