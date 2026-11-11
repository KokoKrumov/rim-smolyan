import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen, waitFor } from '@testing-library/react';
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

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

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
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows a spinner from the moment categories arrive until the stories are rendered', async () => {
    const response = deferred();
    streams.get.mockReturnValue(response.promise);
    const { store } = renderHome();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    act(() => store.dispatch(fetchCategories.fulfilled(categories, 'request')));
    expect(screen.getByRole('status')).toHaveClass('spinner-border');

    await act(async () => response.resolve({ data: [{ id: 1, slug: 'story', title: { rendered: 'Story' } }] }));
    expect(screen.getByRole('link', { name: 'Story' })).toHaveAttribute('href', '/news-and-events/story');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledOnce();
  });

  it('stops loading when the news response is empty', async () => {
    const response = deferred();
    streams.get.mockReturnValue(response.promise);
    renderHome(categories);

    expect(screen.getByRole('status')).toBeInTheDocument();
    await act(async () => response.resolve({ data: [] }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Story' })).not.toBeInTheDocument();
  });

  it('keeps loading until the newest category request finishes', async () => {
    const cachedResponse = deferred();
    const freshResponse = deferred();
    sessionStorage.setItem('categories', JSON.stringify(categories));
    streams.get.mockImplementation((url) => (
      url.includes('categories=10') ? cachedResponse.promise : freshResponse.promise
    ));
    const { store } = renderHome();

    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => store.dispatch(fetchCategories.fulfilled([{ ...categories[0], id: 99 }], 'refresh')));

    await act(async () => cachedResponse.resolve({
      data: [{ id: 1, slug: 'cached', title: { rendered: 'Cached story' } }],
    }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Cached story' })).not.toBeInTheDocument();

    await act(async () => freshResponse.resolve({
      data: [{ id: 2, slug: 'fresh', title: { rendered: 'Fresh story' } }],
    }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Fresh story' })).toBeInTheDocument();
  });

  it('keeps previously loaded news and stops loading after a refresh fails', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const freshResponse = deferred();
    streams.get
      .mockResolvedValueOnce({ data: [{ id: 1, slug: 'story', title: { rendered: 'Story' } }] })
      .mockReturnValueOnce(freshResponse.promise);
    const { store } = renderHome(categories);

    expect(await screen.findByRole('link', { name: 'Story' })).toBeInTheDocument();
    act(() => store.dispatch(fetchCategories.fulfilled([{ ...categories[0], id: 99 }], 'refresh')));
    expect(screen.getByRole('status')).toBeInTheDocument();

    await act(async () => freshResponse.reject(new Error('Network unavailable')));
    expect(error).toHaveBeenCalledWith(
      'Failed to load news', expect.objectContaining({ message: 'Network unavailable' })
    );
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Story' })).toBeInTheDocument();
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

  it('keeps a pending request when refreshed categories only change metadata', async () => {
    let resolveRequest;
    const pendingRequest = new Promise((resolve) => { resolveRequest = resolve; });
    streams.get.mockReturnValue(pendingRequest);
    const { store } = renderHome(categories);

    act(() => store.dispatch(fetchCategories.fulfilled(
      [{ ...categories[0], count: 10 }],
      'refresh',
    )));

    expect(streams.get).toHaveBeenCalledOnce();
    await act(async () => {
      resolveRequest({ data: [{ id: 2, slug: 'pending', title: { rendered: 'Pending story' } }] });
      await pendingRequest;
    });

    expect(await screen.findByRole('link', { name: 'Pending story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledOnce();
  });

  it('does not display retained Redux news when a request is rejected', async () => {
    const retainedStory = { id: 1, slug: 'retained', title: { rendered: 'Retained story' } };
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    streams.get.mockRejectedValue(new Error('Network unavailable'));
    renderHome(categories, { 0: retainedStory });

    await screen.findByText('Новини и Събития');
    await waitFor(() => expect(error).toHaveBeenCalledWith('Failed to load news', expect.any(Object)));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Retained story' })).not.toBeInTheDocument();
  });
});
