import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.setAll(state, messages);
    });
  },
});

export default messagesSlice.reducer;
