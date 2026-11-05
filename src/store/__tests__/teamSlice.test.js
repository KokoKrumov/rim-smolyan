import { configureStore } from '@reduxjs/toolkit';
import publicStreams from '../../api/public';
import teamReducer, { fetchTeam } from '../teamSlice';

vi.mock('../../api/public', () => ({ default: { get: vi.fn() } }));

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

  it('groups every supported department while retaining unknown members in the full team', async () => {
    const departments = [
      'headmaster', 'archeology', 'history', 'ethnography', 'scientific',
      'publicRelations', 'administration', 'fundsAndScientificArchives',
    ];
    const allMembers = departments.map((department, id) => ({ id, department }));
    allMembers.push({ id: 20, department: 'unknown' }, { id: 21 });
    publicStreams.get.mockResolvedValue({ data: allMembers });
    const store = makeStore();

    await store.dispatch(fetchTeam());

    const team = store.getState().team;
    departments.forEach((department, index) => {
      expect(team[department]).toEqual([allMembers[index]]);
    });
    expect(team.defaultTeam).toEqual(allMembers);
    expect(team).not.toHaveProperty('unknown');
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

  it('clears stale departments when a later response changes or empties the team', async () => {
    const replacement = { id: 5, department: 'ethnography' };
    publicStreams.get.mockResolvedValueOnce({ data: members });
    publicStreams.get.mockResolvedValueOnce({ data: [replacement] });
    publicStreams.get.mockResolvedValueOnce({ data: [] });
    const store = makeStore();

    await store.dispatch(fetchTeam());
    await store.dispatch(fetchTeam());

    expect(store.getState().team.headmaster).toEqual([]);
    expect(store.getState().team.history).toEqual([]);
    expect(store.getState().team.ethnography).toEqual([replacement]);
    expect(store.getState().team.defaultTeam).toEqual([replacement]);

    await store.dispatch(fetchTeam());

    Object.values(store.getState().team).forEach((department) => {
      expect(department).toEqual([]);
    });
  });

  it('keeps the existing team when the request fails', async () => {
    publicStreams.get.mockResolvedValueOnce({ data: members });
    publicStreams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore();
    await store.dispatch(fetchTeam());
    const previousTeam = store.getState().team;

    const action = await store.dispatch(fetchTeam());

    expect(fetchTeam.rejected.match(action)).toBe(true);
    expect(action.error.message).toBe('Network Error');
    expect(store.getState().team).toEqual(previousTeam);
  });
});
