import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await streams.get(
    '/categories?_fields=id,name,slug,parent,count,description&per_page=100'
  );
  return response.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export default categoriesSlice.reducer;
