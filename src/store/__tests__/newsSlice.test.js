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

    const action = await store.dispatch(fetchNews(4, 2, 5));

    expect(streams.get.mock.calls[0][0]).toMatch(/categories=4&.*&page=2&per_page=5$/);
    expect(fetchNews.fulfilled.match(action)).toBe(true);
    expect(store.getState().news).toEqual({ 0: { id: 10 }, 1: { id: 20 } });
  });

  it('keeps the positional defaults and exposes lifecycle action creators', async () => {
    streams.get.mockResolvedValue({ data: [] });
    const store = makeStore();

    await store.dispatch(fetchNews(7));

    expect(streams.get.mock.calls[0][0]).toMatch(/categories=7&.*&page=1&per_page=100$/);
    expect(fetchNews.pending.type).toBe('news/fetchNews/pending');
    expect(fetchNews.fulfilled.type).toBe('news/fetchNews/fulfilled');
    expect(fetchNews.rejected.type).toBe('news/fetchNews/rejected');
  });

  it('replaces previous news rather than retaining stale entries', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 10 }, { id: 20 }] });
    streams.get.mockResolvedValueOnce({ data: [{ id: 30 }] });
    const store = makeStore();

    await store.dispatch(fetchNews(4));
    await store.dispatch(fetchNews(4));

    expect(store.getState().news).toEqual({ 0: { id: 30 } });
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

  it('flags a failed news request without dropping previously fetched news', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 10 }] });
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore();
    await store.dispatch(fetchNews(4));

    const action = await store.dispatch(fetchNews(4));

    expect(fetchNews.rejected.match(action)).toBe(true);
    expect(action.error.message).toBe('Network Error');
    expect(store.getState().newsError).toEqual({ newsError: true });
    expect(store.getState().news).toEqual({ 0: { id: 10 } });
  });

  it('flags an error when fetching an article fails', async () => {
    streams.get.mockRejectedValue(new Error('Network Error'));
    const store = makeStore();

    await store.dispatch(fetchArticle('missing-slug'));

    expect(store.getState().newsError).toEqual({ newsError: true });
  });

  it('resets the error flag without discarding news loaded by a retry', async () => {
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    streams.get.mockResolvedValueOnce({ data: [{ id: 10 }] });
    const store = makeStore();

    await store.dispatch(fetchNews(4));
    await store.dispatch(fetchNews(4));
    expect(store.getState().newsError).toEqual({ newsError: true });

    store.dispatch(resetNewsError());
    expect(store.getState().newsError).toEqual({ newsError: false });
    expect(store.getState().news).toEqual({ 0: { id: 10 } });
  });
});
