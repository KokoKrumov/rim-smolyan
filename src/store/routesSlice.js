import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import publicStreams from '../api/public';

export const fetchRoutes = createAsyncThunk('routes/fetchRoutes', async () => {
  const response = await publicStreams.get('/routes.json');
  return response.data;
});

const routesSlice = createSlice({
  name: 'routes',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    });
  },
});

export default routesSlice.reducer;
