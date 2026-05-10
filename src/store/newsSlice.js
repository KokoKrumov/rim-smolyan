import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

// Internal thunk that accepts a single object arg (RTK requirement)
const _fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ id, page = 1, number = 100 }) => {
    const response = await streams.get(
      `/posts?categories=${id}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,_links,_embedded&_embed&page=${page}&per_page=${number}`
    );
    return response.data;
  }
);

// Backward-compatible wrapper preserving original (id, page, number) signature
export const fetchNews = (id, page = 1, number = 100) => _fetchNews({ id, page, number });
// Expose thunk action creators for cross-slice extraReducers
fetchNews.pending = _fetchNews.pending;
fetchNews.fulfilled = _fetchNews.fulfilled;
fetchNews.rejected = _fetchNews.rejected;

const newsSlice = createSlice({
  name: 'news',
  initialState: {},
  reducers: {
    resetFetchNews: () => ({}),
  },
  extraReducers: (builder) => {
    builder.addCase(_fetchNews.fulfilled, (state, action) => {
      return { ...Object.values(action.payload) };
    });
  },
});

export const { resetFetchNews } = newsSlice.actions;
export default newsSlice.reducer;
