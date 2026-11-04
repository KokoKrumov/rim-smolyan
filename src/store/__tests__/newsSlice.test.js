import { configureStore } from '@reduxjs/toolkit';
import streams from '../../api/streams';
import newsReducer, { fetchNews, resetFetchNews } from '../newsSlice';
import newsErrorReducer, { resetNewsError } from '../newsErrorSlice';
import { fetchArticle } from '../articleSlice';

vi.mock('../../api/streams', () => ({ default: { get: vi.fn() } }));

const makeStore = () =>
  configureStore({ reducer: { news: newsReducer, newsError: newsErrorReducer } });

describe('newsSlice', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('stores news as an index-keyed object like the legacy reducer', async () => {
    streams.get.mockResolvedValue({ data: [{ id: 10 }, { id: 20 }] });
    const store = makeStore();

    await store.dispatch(fetchNews(4, 2, 5));

    expect(streams.get.mock.calls[0][0]).toMatch(/categories=4&.*&page=2&per_page=5$/);
    expect(store.getState().news).toEqual({ 0: { id: 10 }, 1: { id: 20 } });
  });

  it('resets news to an empty object', async () => {
    streams.get.mockResolvedValue({ data: [{ id: 10 }] });
    const store = makeStore();

    await store.dispatch(fetchNews(4));
    store.dispatch(resetFetchNews());

    expect(store.getState().news).toEqual({});
  });
});

describe('newsErrorSlice', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('flags an error when fetching news fails', async () => {
    streams.get.mockRejectedValue(new Error('Network Error'));
    const store = makeStore();

    await store.dispatch(fetchNews(4));

    expect(store.getState().newsError).toEqual({ newsError: true });
    expect(store.getState().news).toEqual({});
  });

  it('flags an error when fetching an article fails', async () => {
    streams.get.mockRejectedValue(new Error('Network Error'));
    const store = makeStore();

    await store.dispatch(fetchArticle('missing-slug'));

    expect(store.getState().newsError).toEqual({ newsError: true });
  });

  it('resets the error flag', async () => {
    streams.get.mockRejectedValue(new Error('Network Error'));
    const store = makeStore();

    await store.dispatch(fetchNews(4));
    store.dispatch(resetNewsError());

    expect(store.getState().newsError).toEqual({ newsError: false });
  });
});
