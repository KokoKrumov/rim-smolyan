import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

// Internal thunk accepting a single object arg
const _fetchExhibitions = createAsyncThunk(
  'exhibitions/fetchExhibitions',
  async ({ id, page = 1, number = 100 }, { rejectWithValue }) => {
    try {
      const response = await streams.get(
        `/posts?categories=${id}&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,archive,_links,_embedded&_embed&page=${page}&per_page=${number}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue({ message: error.message, status: error.response?.status });
    }
  }
);

// Backward-compatible wrapper preserving original (id, page, number) signature
export const fetchExhibitions = (id, page = 1, number = 100) =>
  _fetchExhibitions({ id, page, number });
fetchExhibitions.pending = _fetchExhibitions.pending;
fetchExhibitions.fulfilled = _fetchExhibitions.fulfilled;
fetchExhibitions.rejected = _fetchExhibitions.rejected;

const exhibitionsSlice = createSlice({
  name: 'exhibitions',
  initialState: { activeExhibitions: [], archiveExhibitions: [] },
  reducers: {
    resetFetchExhibitions: () => ({ activeExhibitions: [], archiveExhibitions: [] }),
  },
  extraReducers: (builder) => {
    builder.addCase(_fetchExhibitions.fulfilled, (state, action) => {
      // Clear before pushing to prevent duplicates on repeated fetches
      state.activeExhibitions = [];
      state.archiveExhibitions = [];
      action.payload.forEach((exhibition) => {
        if (exhibition.archive) {
          state.archiveExhibitions.push(exhibition);
        } else {
          state.activeExhibitions.push(exhibition);
        }
      });
    });
  },
});

export const { resetFetchExhibitions } = exhibitionsSlice.actions;
export default exhibitionsSlice.reducer;
