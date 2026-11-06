import * as actions from '../../actions';
import { fetchCategories } from '../categoriesSlice';
import { resetExhibitionsError } from '../exhibitionsErrorSlice';
import { modalActions } from '../modalSlice';
import { resetNewsError } from '../newsErrorSlice';
import { store } from '../store';

const entry = { id: 1 };
const member = { id: 2, department: 'history' };
const exhibition = { id: 3, archive: false };
const user = { id: 4 };

const reducerCases = [
  ['article', actions.fetchArticle.fulfilled([entry], 'request', 'article'), [entry]],
  ['categories', fetchCategories.fulfilled([entry], 'request'), { 0: entry }],
  [
    'collections',
    actions.fetchCollectionsMain.fulfilled([entry], 'request', 1),
    { main: [entry], virtual: [], byType: [], description: [], error: [] },
  ],
  ['exhibitionArticle', actions.fetchExhibitionArticle.fulfilled([entry], 'request', 'exhibition'), [entry]],
  [
    'exhibitions',
    actions.fetchExhibitions.fulfilled([exhibition], 'request', { id: 1 }),
    { activeExhibitions: [exhibition], archiveExhibitions: [] },
  ],
  ['exhibitionsError', resetExhibitionsError(), { exhibitionsError: false }],
  [
    'itemFomCollection',
    actions.fetchItemFromCollection.fulfilled(entry, 'request', 'item'),
    { data: entry, error: null },
  ],
  [
    'modal',
    modalActions.showTeam({ data: 'modal-team', user }),
    { type: 'modal-team', user, modalIsOpen: true },
  ],
  ['news', actions.fetchNews.fulfilled([entry], 'request', { id: 1 }), { 0: entry }],
  ['newsError', resetNewsError(), { newsError: false }],
  ['prices', actions.fetchPrices.fulfilled([entry], 'request'), [entry]],
  ['pricesLaszloNagy', actions.fetchPricesLaszloNagy.fulfilled([entry], 'request'), [entry]],
  ['rimBuildingImages', actions.fetchRimBuildingImages.fulfilled([entry], 'request'), { 1: entry }],
  ['routes', actions.fetchRoutes.fulfilled([entry], 'request'), { 1: entry }],
  ['services', actions.fetchServices.fulfilled([entry], 'request'), { 1: entry }],
  [
    'team',
    actions.fetchTeam.fulfilled([member], 'request'),
    {
      headmaster: [],
      archeology: [],
      history: [member],
      ethnography: [],
      scientific: [],
      publicRelations: [],
      administration: [],
      fundsAndScientificArchives: [],
      defaultTeam: [member],
    },
  ],
];

describe('application store reducer wiring', () => {
  it.each(reducerCases)('connects the %s reducer to its state key', (key, action, expected) => {
    store.dispatch(action);

    expect(store.getState()[key]).toEqual(expected);
  });
});
