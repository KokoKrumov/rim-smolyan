import { configureStore } from '@reduxjs/toolkit';
import streams from '../../api/streams';
import exhibitionsReducer, { fetchExhibitions, resetFetchExhibitions } from '../exhibitionsSlice';
import exhibitionsErrorReducer, { resetExhibitionsError } from '../exhibitionsErrorSlice';

vi.mock('../../api/streams', () => ({ default: { get: vi.fn() } }));

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

  it('replaces both lists instead of retaining entries from an earlier fetch', async () => {
    streams.get.mockResolvedValueOnce({ data: exhibitions });
    streams.get.mockResolvedValueOnce({ data: [{ id: 4, archive: true }] });
    const store = makeStore();

    await store.dispatch(fetchExhibitions(1));
    await store.dispatch(fetchExhibitions(1));

    expect(store.getState().exhibitions).toEqual({
      activeExhibitions: [],
      archiveExhibitions: [{ id: 4, archive: true }],
    });
  });

  it('resets to empty lists', async () => {
    streams.get.mockResolvedValue({ data: exhibitions });
    const store = makeStore();

    await store.dispatch(fetchExhibitions(1));
    store.dispatch(resetFetchExhibitions());

    expect(store.getState().exhibitions).toEqual({ activeExhibitions: [], archiveExhibitions: [] });
  });

  it('retains existing exhibitions and sets and resets the error flag on failure', async () => {
    streams.get.mockResolvedValueOnce({ data: exhibitions });
    streams.get.mockRejectedValueOnce(Object.assign(new Error('Server Error'), { response: { status: 500 } }));
    const store = makeStore();
    await store.dispatch(fetchExhibitions(1));
    const previousExhibitions = store.getState().exhibitions;

    const request = store.dispatch(fetchExhibitions(1));
    const action = await request;

    expect(fetchExhibitions.rejected.match(action)).toBe(true);
    expect(action.payload).toEqual({ message: 'Server Error', status: 500 });
    await expect(request.unwrap()).rejects.toEqual({ message: 'Server Error', status: 500 });
    expect(store.getState().exhibitions).toEqual(previousExhibitions);
    expect(store.getState().exhibitionsError).toEqual({ exhibitionsError: true });

    store.dispatch(resetExhibitionsError());
    expect(store.getState().exhibitionsError).toEqual({ exhibitionsError: false });
    expect(store.getState().exhibitions).toEqual(previousExhibitions);
  });

  it('rejects with a serializable payload when the response has no HTTP status', async () => {
    streams.get.mockRejectedValue(new Error('Network Error'));
    const store = makeStore();

    const action = await store.dispatch(fetchExhibitions(1));

    expect(action.payload).toEqual({ message: 'Network Error', status: undefined });
    expect(store.getState().exhibitionsError).toEqual({ exhibitionsError: true });
  });
});
