import { configureStore } from '@reduxjs/toolkit';
import streams from '../../api/streams';
import itemFromCollectionReducer, { fetchItemFromCollection } from '../itemFromCollectionSlice';

vi.mock('../../api/streams', () => ({ default: { get: vi.fn() } }));

const makeStore = () =>
  configureStore({ reducer: { itemFomCollection: itemFromCollectionReducer } });

describe('itemFromCollectionSlice', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('stores the first matching item under data', async () => {
    streams.get.mockResolvedValue({ data: [{ id: 1, slug: 'vase' }, { id: 2 }] });
    const store = makeStore();

    await store.dispatch(fetchItemFromCollection('vase'));

    expect(streams.get.mock.calls[0][0]).toMatch(/^\/posts\?slug=vase&/);
    expect(store.getState().itemFomCollection).toEqual({ data: { id: 1, slug: 'vase' }, error: null });
  });

  it('falls back to an empty object when nothing matches', async () => {
    streams.get.mockResolvedValue({ data: [] });
    const store = makeStore();

    await store.dispatch(fetchItemFromCollection('missing'));

    expect(store.getState().itemFomCollection).toEqual({ data: {}, error: null });
  });

  it('stores the error and clears data when the request fails', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockRejectedValueOnce(Object.assign(new Error('Not Found'), { response: { status: 404 } }));
    const store = makeStore();

    await store.dispatch(fetchItemFromCollection('vase'));
    await store.dispatch(fetchItemFromCollection('gone'));

    expect(store.getState().itemFomCollection).toEqual({
      data: {},
      error: { message: 'Not Found', status: 404 },
    });
  });

  it('clears a previous error after a successful fetch', async () => {
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    const store = makeStore();

    await store.dispatch(fetchItemFromCollection('vase'));
    expect(store.getState().itemFomCollection.error).toEqual({ message: 'Network Error', status: undefined });

    await store.dispatch(fetchItemFromCollection('vase'));
    expect(store.getState().itemFomCollection.error).toBeNull();
  });

  it('handles an aborted request without allowing its late response to replace the error', async () => {
    let resolveRequest;
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockImplementationOnce(() => new Promise((resolve) => { resolveRequest = resolve; }));
    const store = makeStore();
    await store.dispatch(fetchItemFromCollection('vase'));

    const request = store.dispatch(fetchItemFromCollection('slow'));
    expect(store.getState().itemFomCollection.data).toEqual({ id: 1 });
    request.abort('Cancelled by user');
    const action = await request;

    expect(fetchItemFromCollection.rejected.match(action)).toBe(true);
    expect(action.meta.aborted).toBe(true);
    const expectedState = {
      data: {},
      error: { message: 'Cancelled by user', status: null },
    };
    expect(store.getState().itemFomCollection).toEqual(expectedState);

    resolveRequest({ data: [{ id: 2 }] });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(store.getState().itemFomCollection).toEqual(expectedState);
  });

  it('uses a default message when a rejected action has no error details', () => {
    const state = itemFromCollectionReducer(
      { data: { id: 1 }, error: null },
      { type: fetchItemFromCollection.rejected.type }
    );

    expect(state).toEqual({ data: {}, error: { message: 'Request failed', status: null } });
  });
});
