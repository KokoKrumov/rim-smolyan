import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import streams from '../api/streams';

export const fetchCollectionsMain = createAsyncThunk(
  'collections/fetchMain',
  async (parent) => {
    const response = await streams.get(
      `/categories?parent=${parent}&_fields=id,name,slug,description&page=1&per_page=100`
    );
    return response.data;
  }
);

export const fetchCollectionsVirtual = createAsyncThunk(
  'collections/fetchVirtual',
  async (parent) => {
    const response = await streams.get(
      `/categories?parent=${parent}&_fields=id,name,slug,description&page=1&per_page=100`
    );
    return response.data;
  }
);

export const fetchCollectionDescription = createAsyncThunk(
  'collections/fetchDescription',
  async (collectionSlug, { rejectWithValue }) => {
    try {
      const response = await streams.get(
        `/posts?slug=${collectionSlug}&_fields=id,title,content`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: { main: [], virtual: [], byType: [], description: [], error: [] },
  reducers: {
    // Used by the manual fetchCollections thunk below
    setByType: (state, action) => { state.byType = action.payload; },
    setByTypeError: (state, action) => { state.error = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionsMain.fulfilled, (state, action) => {
        state.main = action.payload;
      })
      .addCase(fetchCollectionsVirtual.fulfilled, (state, action) => {
        state.virtual = action.payload;
      })
      .addCase(fetchCollectionDescription.fulfilled, (state, action) => {
        state.description = action.payload;
      })
      .addCase(fetchCollectionDescription.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setByType, setByTypeError } = collectionsSlice.actions;

// Manual thunk: kept as-is because components await its return value directly
export const fetchCollections =
  (slugId, page = 1, number = 100) =>
  async (dispatch) => {
    try {
      const response = await streams.get(
        `/posts?categories=${slugId}&_fields=id,date_gmt,slug,title,content,_links,_embedded&_embed&page=${page}&per_page=${number}`
      );
      dispatch(setByType(response.data));
      return response.data;
    } catch (error) {
      dispatch(setByTypeError(error));
      throw error;
    }
  };

export default collectionsSlice.reducer;
