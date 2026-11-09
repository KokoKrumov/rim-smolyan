import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

export const fetchPricesLaszloNagy = createAsyncThunk(
  'pricesLaszloNagy/fetchPrices',
  async () => {
    const response = await streams.get(
      `/posts?slug=prices-laslo-nagi&_fields=id,date_gmt,slug,title,content`
    );
    return response.data;
  }
);

const pricesLaszloNagySlice = createSlice({
  name: 'pricesLaszloNagy',
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPricesLaszloNagy.fulfilled, (state, action) => action.payload);
  },
});

export default pricesLaszloNagySlice.reducer;
