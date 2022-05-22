import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './channelsSlice.js';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageAdded: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      state.push(...messages);
    });
  },
});

export const selectorMessages = (state) => state.messages;

export const { messageAdded } = messagesSlice.actions;

export default messagesSlice.reducer;
