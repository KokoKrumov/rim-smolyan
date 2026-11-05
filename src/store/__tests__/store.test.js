import { store } from '../store';

describe('store', () => {
  it('keeps the same top-level keys as the legacy combineReducers root', () => {
    expect(Object.keys(store.getState()).sort()).toEqual(
      [
        'article',
        'categories',
        'collections',
        'exhibitionArticle',
        'exhibitions',
        'exhibitionsError',
        'itemFomCollection',
        'modal',
        'news',
        'newsError',
        'prices',
        'pricesLaszloNagy',
        'rimBuildingImages',
        'routes',
        'services',
        'team',
      ].sort()
    );
  });

  it('starts with the expected initial state shapes', () => {
    const state = store.getState();

    expect(state.news).toEqual({});
    expect(state.newsError).toEqual({});
    expect(state.modal).toEqual({});
    expect(state.routes).toEqual({});
    expect(state.article).toEqual({});
    expect(state.prices).toBeNull();
    expect(state.pricesLaszloNagy).toBeNull();
    expect(state.services).toEqual({});
    expect(state.categories).toEqual({});
    expect(state.exhibitions).toEqual({ activeExhibitions: [], archiveExhibitions: [] });
    expect(state.exhibitionsError).toEqual({});
    expect(state.collections).toEqual({ main: [], virtual: [], byType: [], description: [], error: [] });
    expect(state.rimBuildingImages).toEqual({});
    expect(state.exhibitionArticle).toEqual({});
    expect(state.itemFomCollection).toEqual({ data: {}, error: null });
    expect(state.team).toEqual({
      headmaster: [],
      archeology: [],
      history: [],
      ethnography: [],
      scientific: [],
      publicRelations: [],
      administration: [],
      fundsAndScientificArchives: [],
      defaultTeam: [],
    });
  });

  it('accepts plain thunk functions (redux-thunk replacement)', async () => {
    const result = await store.dispatch((dispatch, getState) => {
      dispatch({ type: 'test/noop' });
      return getState().modal;
    });
    expect(result).toEqual({});
  });
});
