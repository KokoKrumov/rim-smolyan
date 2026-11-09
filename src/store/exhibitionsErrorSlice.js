import { createSlice } from '@reduxjs/toolkit';
import { fetchExhibitions } from './exhibitionsSlice';

const exhibitionsErrorSlice = createSlice({
  name: 'exhibitionsError',
  initialState: {},
  reducers: {
    resetExhibitionsError: () => ({ exhibitionsError: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExhibitions.rejected, () => ({ exhibitionsError: true }));
  },
});

export const { resetExhibitionsError } = exhibitionsErrorSlice.actions;
export default exhibitionsErrorSlice.reducer;
