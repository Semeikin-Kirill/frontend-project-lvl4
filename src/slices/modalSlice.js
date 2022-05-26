import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: false, type: null, extra: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    shownModal(state, action) {
      const { type, isOpen, extra } = action.payload;
      state.type = type;
      state.isOpen = isOpen;
      state.extra = extra;
    },
    closedModal(state) {
      state.isOpen = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const selectorModal = (state) => state.modal;

export const { shownModal, closedModal } = modalSlice.actions;

export default modalSlice.reducer;
