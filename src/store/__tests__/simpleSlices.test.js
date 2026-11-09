import { configureStore } from '@reduxjs/toolkit';
import streams from '../../api/streams';
import publicStreams from '../../api/public';
import routesReducer, { fetchRoutes } from '../routesSlice';
import servicesReducer, { fetchServices } from '../servicesSlice';
import rimBuildingImagesReducer, { fetchRimBuildingImages } from '../rimBuildingImagesSlice';
import categoriesReducer, { fetchCategories } from '../categoriesSlice';
import articleReducer, { fetchArticle } from '../articleSlice';
import exhibitionArticleReducer, { fetchExhibitionArticle } from '../exhibitionArticleSlice';
import pricesReducer, { fetchPrices } from '../pricesSlice';
import pricesLaszloNagyReducer, { fetchPricesLaszloNagy } from '../pricesLaszloNagySlice';

vi.mock('../../api/streams', () => ({ default: { get: vi.fn() } }));
vi.mock('../../api/public', () => ({ default: { get: vi.fn() } }));

const makeStore = (reducer) => configureStore({ reducer: { slice: reducer } });
const publicSlices = [
  ['routes', routesReducer, fetchRoutes, '/routes.json'],
  ['services', servicesReducer, fetchServices, '/services.json'],
  ['rimBuildingImages', rimBuildingImagesReducer, fetchRimBuildingImages, '/rim-building-images.json'],
];
const priceSlices = [
  ['prices', pricesReducer, fetchPrices, 'slug=prices&'],
  ['pricesLaszloNagy', pricesLaszloNagyReducer, fetchPricesLaszloNagy, 'slug=prices-laslo-nagi&'],
];

describe('public JSON slices keyed by id', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it.each(publicSlices)('%s loads and keys entries by id', async (_name, reducer, thunk, url) => {
    publicStreams.get.mockResolvedValue({ data: [{ id: 'a', v: 1 }, { id: 'b', v: 2 }] });
    const store = makeStore(reducer);

    await store.dispatch(thunk());

    expect(publicStreams.get).toHaveBeenCalledWith(url);
    expect(store.getState().slice).toEqual({ a: { id: 'a', v: 1 }, b: { id: 'b', v: 2 } });
  });

  it.each(publicSlices)('%s merges later results and preserves them on failure', async (_name, reducer, thunk) => {
    publicStreams.get.mockResolvedValueOnce({ data: [{ id: 'a', v: 1 }, { id: 'b', v: 2 }] });
    publicStreams.get.mockResolvedValueOnce({ data: [{ id: 'b', v: 3 }, { id: 'c', v: 4 }] });
    publicStreams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore(reducer);

    await store.dispatch(thunk());
    await store.dispatch(thunk());

    const expected = {
      a: { id: 'a', v: 1 },
      b: { id: 'b', v: 3 },
      c: { id: 'c', v: 4 },
    };
    expect(store.getState().slice).toEqual(expected);

    const action = await store.dispatch(thunk());

    expect(thunk.rejected.match(action)).toBe(true);
    expect(action.error.message).toBe('Network Error');
    expect(store.getState().slice).toEqual(expected);
  });
});

describe('WordPress API slices', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('categories merges the payload into state', async () => {
    streams.get.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] });
    const store = makeStore(categoriesReducer);

    await store.dispatch(fetchCategories());

    expect(streams.get).toHaveBeenCalledWith(
      '/categories?_fields=id,name,slug,parent,count,description&per_page=100'
    );
    expect(store.getState().slice).toEqual({ 0: { id: 1 }, 1: { id: 2 } });
  });

  it('categories merges later responses and preserves them on failure', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] });
    streams.get.mockResolvedValueOnce({ data: [{ id: 3 }] });
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore(categoriesReducer);

    await store.dispatch(fetchCategories());
    await store.dispatch(fetchCategories());

    const expected = { 0: { id: 3 }, 1: { id: 2 } };
    expect(store.getState().slice).toEqual(expected);

    const action = await store.dispatch(fetchCategories());

    expect(fetchCategories.rejected.match(action)).toBe(true);
    expect(action.error.message).toBe('Network Error');
    expect(store.getState().slice).toEqual(expected);
  });

  it.each(priceSlices)('%s starts as null and stores the response', async (_name, reducer, thunk, query) => {
    streams.get.mockResolvedValue({ data: [{ id: 1 }] });
    const store = makeStore(reducer);
    expect(store.getState().slice).toBeNull();

    await store.dispatch(thunk());

    expect(streams.get.mock.calls[0][0]).toContain(query);
    expect(store.getState().slice).toEqual([{ id: 1 }]);
  });

  it.each(priceSlices)('%s replaces its data and keeps it when a later request fails', async (_name, reducer, thunk) => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockResolvedValueOnce({ data: [{ id: 2 }] });
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore(reducer);

    await store.dispatch(thunk());
    await store.dispatch(thunk());
    expect(store.getState().slice).toEqual([{ id: 2 }]);

    const action = await store.dispatch(thunk());

    expect(thunk.rejected.match(action)).toBe(true);
    expect(action.error.message).toBe('Network Error');
    expect(store.getState().slice).toEqual([{ id: 2 }]);
  });

  it('article stores the response and keeps state on failure', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockRejectedValueOnce(Object.assign(new Error('Not Found'), { response: { status: 404 } }));
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore(articleReducer);

    await store.dispatch(fetchArticle('hello'));
    expect(streams.get).toHaveBeenCalledWith(
      '/posts?slug=hello&_fields=id,date_gmt,slug,title,content,excerpt,event_date,event_place,_links,_embedded&_embed'
    );
    expect(store.getState().slice).toEqual([{ id: 1 }]);

    const request = store.dispatch(fetchArticle('missing'));
    const action = await request;
    expect(fetchArticle.rejected.match(action)).toBe(true);
    expect(action.payload).toEqual({ message: 'Not Found', status: 404 });
    await expect(request.unwrap()).rejects.toEqual({ message: 'Not Found', status: 404 });
    expect(store.getState().slice).toEqual([{ id: 1 }]);

    const networkAction = await store.dispatch(fetchArticle('missing'));
    expect(networkAction.payload).toEqual({ message: 'Network Error', status: undefined });
    expect(store.getState().slice).toEqual([{ id: 1 }]);
  });

  it('exhibitionArticle clears on failure and can load a later response', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockRejectedValueOnce(Object.assign(new Error('Not Found'), { response: { status: 404 } }));
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    streams.get.mockResolvedValueOnce({ data: [{ id: 2 }] });
    const store = makeStore(exhibitionArticleReducer);

    await store.dispatch(fetchExhibitionArticle('expo'));
    expect(streams.get.mock.calls[0][0]).toContain('/posts?slug=expo&_fields=');
    expect(store.getState().slice).toEqual([{ id: 1 }]);

    const action = await store.dispatch(fetchExhibitionArticle('missing'));
    expect(fetchExhibitionArticle.rejected.match(action)).toBe(true);
    expect(action.payload).toEqual({ message: 'Not Found', status: 404 });
    expect(store.getState().slice).toEqual({});

    const networkAction = await store.dispatch(fetchExhibitionArticle('missing'));
    expect(networkAction.payload).toEqual({ message: 'Network Error', status: undefined });
    expect(store.getState().slice).toEqual({});

    await store.dispatch(fetchExhibitionArticle('another'));
    expect(store.getState().slice).toEqual([{ id: 2 }]);
  });
});
