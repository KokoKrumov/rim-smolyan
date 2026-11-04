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

describe('public JSON slices keyed by id', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it.each([
    ['routes', routesReducer, fetchRoutes, '/routes.json'],
    ['services', servicesReducer, fetchServices, '/services.json'],
    ['rimBuildingImages', rimBuildingImagesReducer, fetchRimBuildingImages, '/rim-building-images.json'],
  ])('%s loads %s and keys entries by id', async (_name, reducer, thunk, url) => {
    publicStreams.get.mockResolvedValue({ data: [{ id: 'a', v: 1 }, { id: 'b', v: 2 }] });
    const store = makeStore(reducer);

    await store.dispatch(thunk());

    expect(publicStreams.get).toHaveBeenCalledWith(url);
    expect(store.getState().slice).toEqual({ a: { id: 'a', v: 1 }, b: { id: 'b', v: 2 } });
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

    expect(store.getState().slice).toEqual({ 0: { id: 1 }, 1: { id: 2 } });
  });

  it.each([
    ['prices', pricesReducer, fetchPrices, 'slug=prices&'],
    ['pricesLaszloNagy', pricesLaszloNagyReducer, fetchPricesLaszloNagy, 'slug=prices-laslo-nagi&'],
  ])('%s starts as null and stores the response', async (_name, reducer, thunk, query) => {
    streams.get.mockResolvedValue({ data: [{ id: 1 }] });
    const store = makeStore(reducer);
    expect(store.getState().slice).toBeNull();

    await store.dispatch(thunk());

    expect(streams.get.mock.calls[0][0]).toContain(query);
    expect(store.getState().slice).toEqual([{ id: 1 }]);
  });

  it('article stores the response and keeps state on failure', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore(articleReducer);

    await store.dispatch(fetchArticle('hello'));
    expect(store.getState().slice).toEqual([{ id: 1 }]);

    const action = await store.dispatch(fetchArticle('missing'));
    expect(action.payload).toEqual({ message: 'Network Error', status: undefined });
    expect(store.getState().slice).toEqual([{ id: 1 }]);
  });

  it('exhibitionArticle stores the response and clears on failure', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    const store = makeStore(exhibitionArticleReducer);

    await store.dispatch(fetchExhibitionArticle('expo'));
    expect(store.getState().slice).toEqual([{ id: 1 }]);

    await store.dispatch(fetchExhibitionArticle('missing'));
    expect(store.getState().slice).toEqual({});
  });
});
