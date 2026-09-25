import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import publicStreams from '../api/public';

export const fetchRimBuildingImages = createAsyncThunk(
  'rimBuildingImages/fetchImages',
  async () => {
    const response = await publicStreams.get('/rim-building-images.json');
    return response.data;
  }
);

const rimBuildingImagesSlice = createSlice({
  name: 'rimBuildingImages',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRimBuildingImages.fulfilled, (state, action) => {
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    });
  },
});

export default rimBuildingImagesSlice.reducer;
