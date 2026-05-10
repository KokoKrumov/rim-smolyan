import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

export const fetchArticle = createAsyncThunk(
  'article/fetchArticle',
  async (urlSlug, { rejectWithValue }) => {
    try {
      const response = await streams.get(
        `/posts?slug=${urlSlug}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,_links,_embedded&_embed`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => action.payload);
  },
});

export default articleSlice.reducer;
