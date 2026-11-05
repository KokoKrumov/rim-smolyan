import streams from '../../api/streams';
import {
  fetchArticle,
  fetchCategories,
  fetchExhibitions,
  fetchItemFromCollection,
  fetchNews,
} from '../../actions';
import { resetExhibitionsError } from '../exhibitionsErrorSlice';
import { resetNewsError } from '../newsErrorSlice';
import { store } from '../store';

vi.mock('../../api/streams', () => ({ default: { get: vi.fn() } }));

describe('application store integration', () => {
  it('connects legacy actions to data and cross-slice error reducers', async () => {
    streams.get.mockResolvedValueOnce({ data: [{ id: 10 }] });
    streams.get.mockRejectedValueOnce(Object.assign(new Error('Not Found'), { response: { status: 404 } }));
    streams.get.mockResolvedValueOnce({
      data: [{ id: 20, archive: false }, { id: 21, archive: true }],
    });
    streams.get.mockRejectedValueOnce(new Error('Network Error'));
    streams.get.mockResolvedValueOnce({ data: [{ id: 30, slug: 'vase' }] });
    streams.get.mockResolvedValueOnce({ data: [{ id: 40, slug: 'news' }] });

    await store.dispatch(fetchNews(7));
    expect(store.getState().news).toEqual({ 0: { id: 10 } });

    const articleAction = await store.dispatch(fetchArticle('missing'));
    expect(articleAction.payload).toEqual({ message: 'Not Found', status: 404 });
    expect(store.getState().newsError).toEqual({ newsError: true });

    await store.dispatch(fetchExhibitions(8));
    const exhibitions = {
      activeExhibitions: [{ id: 20, archive: false }],
      archiveExhibitions: [{ id: 21, archive: true }],
    };
    expect(store.getState().exhibitions).toEqual(exhibitions);

    const exhibitionsAction = await store.dispatch(fetchExhibitions(8));
    expect(exhibitionsAction.payload).toEqual({ message: 'Network Error', status: undefined });
    expect(store.getState().exhibitionsError).toEqual({ exhibitionsError: true });
    expect(store.getState().exhibitions).toEqual(exhibitions);

    await store.dispatch(fetchItemFromCollection('vase'));
    expect(store.getState().itemFomCollection).toEqual({
      data: { id: 30, slug: 'vase' },
      error: null,
    });

    const categories = await store.dispatch(fetchCategories());
    expect(categories).toEqual([{ id: 40, slug: 'news' }]);
    expect(store.getState().categories).toEqual({ 0: { id: 40, slug: 'news' } });

    store.dispatch(resetNewsError());
    store.dispatch(resetExhibitionsError());
    expect(store.getState().newsError).toEqual({ newsError: false });
    expect(store.getState().exhibitionsError).toEqual({ exhibitionsError: false });
    expect(store.getState().news).toEqual({ 0: { id: 10 } });
    expect(store.getState().exhibitions).toEqual(exhibitions);
  });
});
