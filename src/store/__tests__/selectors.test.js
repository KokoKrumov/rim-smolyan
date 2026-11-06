import {
  selectCategories, selectNews, selectRimBuildingImages,
  selectExhibitionArticle, selectRoutes, selectServices,
} from '../selectors';

describe('memoized list selectors', () => {
  it.each([
    ['categories', selectCategories],
    ['news', selectNews],
    ['rimBuildingImages', selectRimBuildingImages],
    ['exhibitionArticle', selectExhibitionArticle],
    ['routes', selectRoutes],
    ['services', selectServices],
  ])('preserves %s references until that slice changes', (key, selector) => {
    const item = { id: 1 };
    const state = { [key]: { 0: item } };
    const first = selector(state);

    expect(first).toEqual([item]);
    expect(selector({ ...state, modal: { modalIsOpen: true } })).toBe(first);
    expect(selector({ ...state, [key]: { 0: item, 1: { id: 2 } } })).toEqual([item, { id: 2 }]);
    expect(selector({ ...state, [key]: {} })).toEqual([]);
  });
});
