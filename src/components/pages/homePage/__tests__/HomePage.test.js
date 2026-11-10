import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import streams from '../../../../api/streams';
import categoriesReducer, { fetchCategories } from '../../../../store/categoriesSlice';
import newsReducer from '../../../../store/newsSlice';
import messages from '../../../../translations/en.json';
import HomePage from '../HomePage';

vi.mock('../../../../api/streams', () => ({ default: { get: vi.fn() } }));
vi.mock('../../../carousel/carouselMegatron', () => ({ default: () => <div data-testid="desktop-carousel" /> }));
vi.mock('../../../carousel/CarouselMegatronMobile', () => ({ default: () => <div data-testid="mobile-carousel" /> }));

const categories = [{ id: 10, slug: 'news-and-events', name: 'News' }];

function setWidth(width) {
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: width });
}

function renderHome(initialCategories = [], initialNews = {}) {
  const store = configureStore({
    reducer: { categories: categoriesReducer, news: newsReducer },
    preloadedState: { categories: initialCategories, news: initialNews },
  });
  const result = render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <MemoryRouter><HomePage /></MemoryRouter>
      </IntlProvider>
    </Provider>,
  );
  return { ...result, store };
}

describe('HomePage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    setWidth(1600);
    streams.get.mockResolvedValue({ data: [{ id: 1, slug: 'story', title: { rendered: 'Story' } }] });
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
    delete document.documentElement.clientWidth;
  });

  it('loads news when Redux categories arrive even if storage has already been populated', async () => {
    const { store } = renderHome();
    sessionStorage.setItem('categories', JSON.stringify(categories));
    act(() => store.dispatch(fetchCategories.fulfilled(categories, 'request')));
    expect(await screen.findByRole('link', { name: 'Story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledOnce();
  });

  it('uses cached Redux categories and removes the exact resize listener after navigation', async () => {
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHome(categories);
    expect(await screen.findByRole('link', { name: 'Story' })).toBeInTheDocument();
    const handler = add.mock.calls.find(([event]) => event === 'resize')[1];

    expect(screen.getByTestId('desktop-carousel')).toBeInTheDocument();
    setWidth(600);
    act(() => window.dispatchEvent(new Event('resize')));
    expect(screen.getByTestId('mobile-carousel')).toBeInTheDocument();
    unmount();
    expect(remove).toHaveBeenCalledWith('resize', handler);
  });

  it('does not request news when the selected category is missing', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderHome([{ id: 8, slug: 'exhibitions', name: 'Exhibitions' }]);

    expect(streams.get).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith('Category not found: news-and-events');
  });

  it('keeps the latest fulfilled request when cached categories finish late', async () => {
    let resolveCached;
    let resolveFresh;
    const cachedRequest = new Promise((resolve) => { resolveCached = resolve; });
    const freshRequest = new Promise((resolve) => { resolveFresh = resolve; });
    const cachedCategories = categories;
    const freshCategories = [{ ...categories[0], id: 99 }];
    const cachedStory = { id: 1, slug: 'cached', title: { rendered: 'Cached story' } };
    const freshStory = { id: 2, slug: 'fresh', title: { rendered: 'Fresh story' } };
    sessionStorage.setItem('categories', JSON.stringify(cachedCategories));
    streams.get.mockImplementation((url) => (
      url.includes('categories=10') ? cachedRequest : freshRequest
    ));
    const { store } = renderHome();

    act(() => store.dispatch(fetchCategories.fulfilled(freshCategories, 'refresh')));
    await act(async () => {
      resolveFresh({ data: [freshStory] });
      await freshRequest;
    });
    await act(async () => {
      resolveCached({ data: [cachedStory] });
      await cachedRequest;
    });

    expect(await screen.findByRole('link', { name: 'Fresh story' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Cached story' })).not.toBeInTheDocument();
  });

  it('does not display retained Redux news when a request is rejected', async () => {
    const retainedStory = { id: 1, slug: 'retained', title: { rendered: 'Retained story' } };
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    streams.get.mockRejectedValue(new Error('Network unavailable'));
    renderHome(categories, { 0: retainedStory });

    await screen.findByText('Новини и Събития');
    expect(screen.queryByRole('link', { name: 'Retained story' })).not.toBeInTheDocument();
    expect(error).toHaveBeenCalledWith('Failed to load news', expect.any(Object));
  });
});
