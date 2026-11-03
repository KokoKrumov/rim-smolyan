import { configureStore } from '@reduxjs/toolkit';
import streams from '../api/streams';
import exhibitionsReducer, { fetchExhibitions, resetFetchExhibitions } from './exhibitionsSlice';
import exhibitionsErrorReducer, { resetExhibitionsError } from './exhibitionsErrorSlice';

vi.mock('../api/streams', () => ({ default: { get: vi.fn() } }));

const exhibitions = [
  { id: 1, archive: false },
  { id: 2, archive: true },
  { id: 3 },
];

const makeStore = () =>
  configureStore({
    reducer: { exhibitions: exhibitionsReducer, exhibitionsError: exhibitionsErrorReducer },
  });

describe('exhibitionsSlice', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('keeps the legacy (id, page, number) signature with defaults', async () => {
    streams.get.mockResolvedValue({ data: [] });
    const store = makeStore();

    await store.dispatch(fetchExhibitions(7));
    expect(streams.get.mock.calls[0][0]).toMatch(/categories=7&.*&page=1&per_page=100$/);

    await store.dispatch(fetchExhibitions(7, 3, 10));
    expect(streams.get.mock.calls[1][0]).toMatch(/categories=7&.*&page=3&per_page=10$/);
  });

  it('exposes pending/fulfilled/rejected on the wrapper for cross-slice reducers', () => {
    expect(fetchExhibitions.pending.type).toBe('exhibitions/fetchExhibitions/pending');
    expect(fetchExhibitions.fulfilled.type).toBe('exhibitions/fetchExhibitions/fulfilled');
    expect(fetchExhibitions.rejected.type).toBe('exhibitions/fetchExhibitions/rejected');
  });

  it('splits exhibitions into active and archive', async () => {
    streams.get.mockResolvedValue({ data: exhibitions });
    const store = makeStore();

    await store.dispatch(fetchExhibitions(1));
    const state = store.getState().exhibitions;

    expect(state.activeExhibitions.map((e) => e.id)).toEqual([1, 3]);
    expect(state.archiveExhibitions.map((e) => e.id)).toEqual([2]);
  });

  it('replaces instead of appending on repeated fetches', async () => {
    streams.get.mockResolvedValue({ data: exhibitions });
    const store = makeStore();

    await store.dispatch(fetchExhibitions(1));
    await store.dispatch(fetchExhibitions(1));

    expect(store.getState().exhibitions.activeExhibitions).toHaveLength(2);
    expect(store.getState().exhibitions.archiveExhibitions).toHaveLength(1);
  });

  it('resets to empty lists', async () => {
    streams.get.mockResolvedValue({ data: exhibitions });
    const store = makeStore();

    await store.dispatch(fetchExhibitions(1));
    store.dispatch(resetFetchExhibitions());

    expect(store.getState().exhibitions).toEqual({ activeExhibitions: [], archiveExhibitions: [] });
  });

  it('sets and resets the exhibitions error flag', async () => {
    streams.get.mockRejectedValue(Object.assign(new Error('Server Error'), { response: { status: 500 } }));
    const store = makeStore();

    const action = await store.dispatch(fetchExhibitions(1));

    expect(action.payload).toEqual({ message: 'Server Error', status: 500 });
    expect(store.getState().exhibitionsError).toEqual({ exhibitionsError: true });

    store.dispatch(resetExhibitionsError());
    expect(store.getState().exhibitionsError).toEqual({ exhibitionsError: false });
  });
});
