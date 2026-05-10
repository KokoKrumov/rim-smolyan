import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

export const fetchExhibitionArticle = createAsyncThunk(
  'exhibitionArticle/fetchArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await streams.get(
        `/posts?slug=${slug}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,archive,_links,_embedded&_embed `
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const exhibitionArticleSlice = createSlice({
  name: 'exhibitionArticle',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExhibitionArticle.fulfilled, (state, action) => action.payload)
      .addCase(fetchExhibitionArticle.rejected, (state, action) => action.payload);
  },
});

export default exhibitionArticleSlice.reducer;
