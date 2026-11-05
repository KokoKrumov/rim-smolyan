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

    expect(streams.get).toHaveBeenNthCalledWith(
      1, '/categories?parent=11&_fields=id,name,slug,description&page=1&per_page=100'
    );
    expect(streams.get).toHaveBeenNthCalledWith(
      2, '/categories?parent=12&_fields=id,name,slug,description&page=1&per_page=100'
    );
    expect(store.getState().collections.main).toEqual([{ id: 1 }]);
    expect(store.getState().collections.virtual).toEqual([{ id: 2 }]);
  });

  it.each([
    ['main', fetchCollectionsMain],
    ['virtual', fetchCollectionsVirtual],
  ])('keeps existing %s collections when a request fails', async (key, thunk) => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore();
    await store.dispatch(thunk(11));
    const previousState = store.getState().collections;

    const action = await store.dispatch(thunk(11));

    expect(thunk.rejected.match(action)).toBe(true);
    expect(action.error.message).toBe('Network Error');
    expect(store.getState().collections).toEqual(previousState);
    expect(store.getState().collections[key]).toEqual([{ id: 1 }]);
  });

  it('stores the description or the error payload', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 3 }] });
    streams.get.mockRejectedValueOnce(Object.assign(new Error('Not Found'), { response: { status: 404 } }));
    const store = makeStore();

    await store.dispatch(fetchCollectionDescription('icons'));
    expect(store.getState().collections.description).toEqual([{ id: 3 }]);

    const action = await store.dispatch(fetchCollectionDescription('missing'));

    expect(streams.get).toHaveBeenNthCalledWith(1, '/posts?slug=icons&_fields=id,title,content');
    expect(fetchCollectionDescription.rejected.match(action)).toBe(true);
    expect(action.payload).toEqual({ message: 'Not Found', status: 404 });
    expect(store.getState().collections.description).toEqual([{ id: 3 }]);
    expect(store.getState().collections.error).toEqual({ message: 'Not Found', status: 404 });
  });

  it('stores a description request error without an HTTP response', async () => {
    streams.get.mockRejectedValue(new Error('Network Error'));
    const store = makeStore();

    const action = await store.dispatch(fetchCollectionDescription('icons'));

    expect(action.payload).toEqual({ message: 'Network Error', status: undefined });
    expect(store.getState().collections.error).toEqual({ message: 'Network Error', status: undefined });
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

    it('forwards custom pagination parameters', async () => {
      streams.get.mockResolvedValue({ data: [{ id: 6 }] });
      const store = makeStore();

      const result = await store.dispatch(fetchCollections(9, 3, 10));

      expect(streams.get).toHaveBeenCalledWith(
        '/posts?categories=9&_fields=id,date_gmt,slug,title,content,_links,_embedded&_embed&page=3&per_page=10'
      );
      expect(result).toEqual([{ id: 6 }]);
      expect(store.getState().collections.byType).toEqual([{ id: 6 }]);
    });

    it('keeps existing data, stores the error and rethrows it', async () => {
      const error = Object.assign(new Error('Server Error'), { response: { status: 500 } });
      streams.get.mockResolvedValueOnce({ data: [{ id: 5 }] });
      streams.get.mockRejectedValueOnce(error);
      const store = makeStore();
      await store.dispatch(fetchCollections(9));

      await expect(store.dispatch(fetchCollections(9))).rejects.toBe(error);
      expect(store.getState().collections.byType).toEqual([{ id: 5 }]);
      expect(store.getState().collections.error).toEqual({ message: 'Server Error', status: 500 });
    });

    it('stores and rethrows network errors without an HTTP status', async () => {
      const error = new Error('Network Error');
      streams.get.mockRejectedValue(error);
      const store = makeStore();

      await expect(store.dispatch(fetchCollections(9))).rejects.toBe(error);
      expect(store.getState().collections.error).toEqual({ message: 'Network Error', status: undefined });
    });
  });
});
