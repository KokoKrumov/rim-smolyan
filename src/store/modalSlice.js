import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {},
  reducers: {
    showRedirect: (state, action) => ({
      ...state,
      type: action.payload.data,
      url: action.payload.url,
      modalIsOpen: true,
    }),
    closeRedirect: (state, action) => ({
      ...state,
      type: action.payload.data,
      url: action.payload.url,
      modalIsOpen: false,
    }),
    showNedelov: (state, action) => ({
      ...state,
      type: action.payload.data,
      modalIsOpen: true,
    }),
    closeNedelov: (state, action) => ({
      ...state,
      type: action.payload.data,
      modalIsOpen: false,
    }),
    showTeam: (state, action) => ({
      ...state,
      type: action.payload.data,
      user: action.payload.user,
      modalIsOpen: true,
    }),
    closeTeam: (state, action) => ({
      ...state,
      type: action.payload.data,
      modalIsOpen: false,
    }),
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
