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
      const nextState = state;
      nextState[channel] = has(state, channel) ? [...state[channel], message] : [message];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      const nextState = state;
      messages.forEach((message) => {
        const { channel } = message;
        nextState[channel] = has(state, channel) ? [...state[channel], message] : [message];
      });
    })
      .addCase(removedChannel, (state, action) => {
        const nextState = state;
        const { id } = action.payload;
        delete nextState[id];
      });
  },
});

export const selectorMessages = (state) => state.messages;

export const { messageAdded } = messagesSlice.actions;

export default messagesSlice.reducer;
