import { configureStore } from '@reduxjs/toolkit';
import publicStreams from '../api/public';
import teamReducer, { fetchTeam } from './teamSlice';

vi.mock('../api/public', () => ({ default: { get: vi.fn() } }));

const members = [
  { id: 1, name: 'A', department: 'headmaster' },
  { id: 2, name: 'B', department: 'history' },
  { id: 3, name: 'C', department: 'history' },
  { id: 4, name: 'D', department: 'unknown-department' },
];

const makeStore = () => configureStore({ reducer: { team: teamReducer } });

describe('teamSlice', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('loads team.json and groups members by department', async () => {
    publicStreams.get.mockResolvedValue({ data: members });
    const store = makeStore();

    await store.dispatch(fetchTeam());
    const { team } = store.getState();

    expect(publicStreams.get).toHaveBeenCalledWith('/team.json');
    expect(team.headmaster.map((m) => m.id)).toEqual([1]);
    expect(team.history.map((m) => m.id)).toEqual([2, 3]);
    expect(team.archeology).toEqual([]);
    expect(team).not.toHaveProperty('unknown-department');
    expect(team.defaultTeam).toEqual(members);
  });

  it('does not duplicate members on repeated fetches', async () => {
    publicStreams.get.mockResolvedValue({ data: members });
    const store = makeStore();

    await store.dispatch(fetchTeam());
    await store.dispatch(fetchTeam());

    expect(store.getState().team.history).toHaveLength(2);
  });

  it('does not leak state between store instances', async () => {
    publicStreams.get.mockResolvedValue({ data: members });
    await makeStore().dispatch(fetchTeam());

    expect(makeStore().getState().team.history).toEqual([]);
  });
});
