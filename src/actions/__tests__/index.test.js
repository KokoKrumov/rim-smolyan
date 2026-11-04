import { configureStore } from '@reduxjs/toolkit';
import streams from '../../api/streams';
import modalReducer from '../../store/modalSlice';
import categoriesReducer from '../../store/categoriesSlice';
import { showModal, closeModal, fetchCategories } from '../index';

vi.mock('../../api/streams', () => ({ default: { get: vi.fn() } }));

const makeStore = () =>
  configureStore({ reducer: { modal: modalReducer, categories: categoriesReducer } });

describe('legacy action creators', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('showModal / closeModal', () => {
    it('opens and closes the redirect modal with its url', () => {
      const store = makeStore();

      store.dispatch(showModal('modal-redirect', 'https://example.com'));
      expect(store.getState().modal).toEqual({
        type: 'modal-redirect',
        url: 'https://example.com',
        modalIsOpen: true,
      });

      store.dispatch(closeModal('modal-redirect'));
      expect(store.getState().modal).toEqual({
        type: 'modal-redirect',
        url: undefined,
        modalIsOpen: false,
      });
    });

    it('opens and closes the Shishkov modal', () => {
      const store = makeStore();

      store.dispatch(showModal('modal-shishkov'));
      expect(store.getState().modal).toEqual({ type: 'modal-shishkov', modalIsOpen: true });

      store.dispatch(closeModal('modal-shishkov'));
      expect(store.getState().modal).toEqual({ type: 'modal-shishkov', modalIsOpen: false });
    });

    it('opens the team modal with the selected user', () => {
      const store = makeStore();
      const user = { id: 1, name: 'Test' };

      store.dispatch(showModal('modal-team', undefined, user));
      expect(store.getState().modal).toEqual({ type: 'modal-team', user, modalIsOpen: true });

      store.dispatch(closeModal('modal-team'));
      expect(store.getState().modal).toMatchObject({ type: 'modal-team', modalIsOpen: false });
    });

    it('ignores unknown modal types', () => {
      const store = makeStore();

      expect(store.dispatch(showModal('modal-unknown'))).toBeUndefined();
      expect(store.dispatch(closeModal('modal-unknown'))).toBeUndefined();
      expect(store.getState().modal).toEqual({});
    });
  });

  describe('fetchCategories', () => {
    it('resolves with the categories so callers can await them', async () => {
      streams.get.mockResolvedValue({ data: [{ id: 1, slug: 'news' }] });
      const store = makeStore();

      const result = await store.dispatch(fetchCategories());

      expect(result).toEqual([{ id: 1, slug: 'news' }]);
      expect(store.getState().categories).toEqual({ 0: { id: 1, slug: 'news' } });
    });

    it('rejects when the request fails', async () => {
      streams.get.mockRejectedValue(new Error('Network Error'));
      const store = makeStore();

      await expect(store.dispatch(fetchCategories())).rejects.toThrow('Network Error');
    });
  });
});
