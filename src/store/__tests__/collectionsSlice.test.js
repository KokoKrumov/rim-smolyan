import { configureStore } from '@reduxjs/toolkit';
import streams from '../../api/streams';
import collectionsReducer, {
  fetchCollections,
  fetchCollectionsMain,
  fetchCollectionsVirtual,
  fetchCollectionDescription,
} from '../collectionsSlice';

vi.mock('../../api/streams', () => ({ default: { get: vi.fn() } }));

const makeStore = () => configureStore({ reducer: { collections: collectionsReducer } });

describe('collectionsSlice', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('stores main and virtual collections separately', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockResolvedValueOnce({ data: [{ id: 2 }] });
    const store = makeStore();

    await store.dispatch(fetchCollectionsMain(11));
    await store.dispatch(fetchCollectionsVirtual(12));

    expect(streams.get.mock.calls[0][0]).toMatch(/^\/categories\?parent=11&/);
    expect(streams.get.mock.calls[1][0]).toMatch(/^\/categories\?parent=12&/);
    expect(store.getState().collections.main).toEqual([{ id: 1 }]);
    expect(store.getState().collections.virtual).toEqual([{ id: 2 }]);
  });

  it('stores the description or the error payload', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 3 }] });
    streams.get.mockRejectedValueOnce(Object.assign(new Error('Not Found'), { response: { status: 404 } }));
    const store = makeStore();

    await store.dispatch(fetchCollectionDescription('icons'));
    expect(store.getState().collections.description).toEqual([{ id: 3 }]);

    await store.dispatch(fetchCollectionDescription('missing'));
    expect(store.getState().collections.error).toEqual({ message: 'Not Found', status: 404 });
  });

  describe('fetchCollections (manual thunk)', () => {
    it('returns the data directly and stores it in byType', async () => {
      streams.get.mockResolvedValue({ data: [{ id: 5 }] });
      const store = makeStore();

      const result = await store.dispatch(fetchCollections(9));

      expect(streams.get.mock.calls[0][0]).toMatch(/categories=9&.*&page=1&per_page=100$/);
      expect(result).toEqual([{ id: 5 }]);
      expect(store.getState().collections.byType).toEqual([{ id: 5 }]);
    });

    it('stores the error and rethrows so callers can catch it', async () => {
      const error = Object.assign(new Error('Server Error'), { response: { status: 500 } });
      streams.get.mockRejectedValue(error);
      const store = makeStore();

      await expect(store.dispatch(fetchCollections(9))).rejects.toBe(error);
      expect(store.getState().collections.error).toEqual({ message: 'Server Error', status: 500 });
    });
  });
});
