import { createSlice } from '@reduxjs/toolkit';
import { fetchNews } from './newsSlice';
import { fetchArticle } from './articleSlice';

const newsErrorSlice = createSlice({
  name: 'newsError',
  initialState: {},
  reducers: {
    resetNewsError: () => ({ newsError: false }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.rejected, () => ({ newsError: true }))
      .addCase(fetchArticle.rejected, () => ({ newsError: true }));
  },
});

export const { resetNewsError } = newsErrorSlice.actions;
export default newsErrorSlice.reducer;
