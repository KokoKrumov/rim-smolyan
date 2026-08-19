import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

export const fetchPrices = createAsyncThunk('prices/fetchPrices', async () => {
  const response = await streams.get(
    `/posts?slug=prices&_fields=id,date_gmt,slug,title,content`
  );
  return response.data;
});

const pricesSlice = createSlice({
  name: 'prices',
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.fulfilled, (state, action) => action.payload);
  },
});

export default pricesSlice.reducer;
