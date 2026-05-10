import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import publicStreams from '../api/public';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const response = await publicStreams.get('/services.json');
  return response.data;
});

const servicesSlice = createSlice({
  name: 'services',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    });
  },
});

export default servicesSlice.reducer;
