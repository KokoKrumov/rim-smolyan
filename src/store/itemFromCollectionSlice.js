import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

export const fetchItemFromCollection = createAsyncThunk(
  'itemFromCollection/fetch',
  async (urlSlug, { rejectWithValue }) => {
    try {
      const response = await streams.get(
        `/posts?slug=${urlSlug}&_fields=id,date_gmt,slug,title,content,excerpt,collection_item_dating,collection_item_inventory_number,collection_item_location,collection_item_material,collection_item_size,_links,_embedded&_embed`
      );
      return response.data[0];
    } catch (error) {
      return rejectWithValue({ message: error.message, status: error.response?.status });
    }
  }
);

const itemFromCollectionSlice = createSlice({
  name: 'itemFomCollection', // preserving original key spelling
  initialState: {
    data: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemFromCollection.fulfilled, (state, action) => {
        state.data = action.payload || {};
        state.error = null;
      })
      .addCase(fetchItemFromCollection.rejected, (state, action) => {
        state.data = {};
        state.error = action.payload || {
          message: action.error?.message || 'Request failed',
          status: null,
        };
      });
  },
});

export default itemFromCollectionSlice.reducer;
