import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import publicStreams from '../api/public';

export const fetchTeam = createAsyncThunk('team/fetchTeam', async () => {
  const response = await publicStreams.get('/team.json');
  return response.data;
});

const DEPARTMENTS = [
  'headmaster', 'archeology', 'history', 'ethnography', 'scientific',
  'publicRelations', 'administration', 'fundsAndScientificArchives',
];

const initialState = {
  headmaster: [],
  archeology: [],
  history: [],
  ethnography: [],
  scientific: [],
  publicRelations: [],
  administration: [],
  fundsAndScientificArchives: [],
  defaultTeam: [],
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeam.fulfilled, (state, action) => {
      // Reset all department arrays before populating (fixes original mutation bug)
      DEPARTMENTS.forEach((dept) => { state[dept] = []; });
      action.payload.forEach((member) => {
        if (state[member.department] !== undefined) {
          state[member.department].push(member);
        }
      });
      state.defaultTeam = action.payload;
    });
  },
});

export default teamSlice.reducer;
