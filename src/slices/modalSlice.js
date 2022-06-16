import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, type: null, extra: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    shownModal(state, action) {
      const { type, extra } = action.payload;
      const nextState = state;
      nextState.type = type;
      nextState.isOpen = true;
      nextState.extra = extra;
    },
    closedModal(state) {
      const nextState = state;
      nextState.isOpen = false;
      nextState.type = null;
      nextState.extra = null;
    },
  },
});

export const selectorModal = (state) => state.modal;

export const { shownModal, closedModal } = modalSlice.actions;

export default modalSlice.reducer;
