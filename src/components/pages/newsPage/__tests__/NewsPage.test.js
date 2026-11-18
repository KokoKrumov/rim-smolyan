import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import streams from '../../../../api/streams';
import categoriesReducer, { fetchCategories } from '../../../../store/categoriesSlice';
import newsErrorReducer from '../../../../store/newsErrorSlice';
import newsReducer from '../../../../store/newsSlice';
import messages from '../../../../translations/en.json';
import NewsPage from '../NewsPage';

vi.mock('../../../../api/streams', () => ({ default: { get: vi.fn() } }));

const categories = [
  { id: 10, slug: 'news-and-events', name: 'All' },
  { id: 11, slug: 'news', name: 'News' },
  { id: 12, slug: 'events', name: 'Events' },
];

const article = (slug, title) => ({
  slug,
  title: { rendered: title },
  excerpt: { rendered: `<p>${title} summary</p>` },
  date_gmt: '2024-03-15T12:00:00',
  _embedded: {},
});

function deferred() {
  let resolve;
  const promise = new Promise((res) => { resolve = res; });
  return { promise, resolve };
}

let observer;

class TestIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observe = vi.fn();
    this.disconnect = vi.fn();
    observer = this;
  }
}

function renderNewsPage({ path = '/news-and-events', storedCategories = true, initialNews = {}, initialCategories = categories } = {}) {
  window.history.replaceState(null, '', path);
  if (storedCategories) {
    sessionStorage.setItem('categories', JSON.stringify(categories));
  }
  const store = configureStore({
    reducer: { news: newsReducer, newsError: newsErrorReducer, categories: categoriesReducer },
    preloadedState: { categories: initialCategories, news: initialNews },
  });
  const result = render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <BrowserRouter>
          <NewsPage />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
  return { ...result, store };
}

describe('NewsPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
    vi.stubGlobal('IntersectionObserver', TestIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    sessionStorage.clear();
    window.history.replaceState(null, '', '/');
    document.body.style.overflow = '';
  });

  it('resets old news, loads the current category and observes the pagination sentinel', async () => {
    const first = article('new-story', 'New story');
    streams.get.mockResolvedValue({ data: [first] });
    const old = article('old-story', 'Old story');
    const { store } = renderNewsPage({ initialNews: { 0: old } });

    expect(await screen.findByRole('link', { name: 'New story' })).toHaveAttribute(
      'href',
      '/news-and-events/new-story'
    );
    expect(screen.queryByRole('link', { name: 'Old story' })).not.toBeInTheDocument();
    expect(store.getState().news).toEqual({ 0: first });
    expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/categories=10&.*&page=1&per_page=10$/));
    expect(screen.getByRole('button', { name: 'Всички' })).toHaveClass('active');
    expect(observer.options).toEqual({ root: null, rootMargin: '0px', threshold: 0.9 });
    expect(observer.observe).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('switches category, resets the visible list and does not reload the active tab', async () => {
    streams.get.mockImplementation((url) => {
      if (url.includes('categories=10')) return Promise.resolve({ data: [article('all-story', 'All story')] });
      if (url.includes('categories=11')) return Promise.resolve({ data: [article('news-story', 'News story')] });
      throw new Error(`Unexpected request: ${url}`);
    });
    const user = userEvent.setup();
    renderNewsPage();

    expect(await screen.findByRole('link', { name: 'All story' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Новини' }));

    expect(await screen.findByRole('link', { name: 'News story' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'All story' })).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/news');
    expect(screen.getByRole('button', { name: 'Новини' })).toHaveClass('active');
    expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/categories=11&.*&page=1&per_page=10$/));

    const requestCount = streams.get.mock.calls.length;
    await user.click(screen.getByRole('button', { name: 'Новини' }));
    expect(streams.get).toHaveBeenCalledTimes(requestCount);
  });

  it('appends the next page when the sentinel moves upward', async () => {
    streams.get.mockImplementation((url) => {
      if (url.includes('page=1&per_page=10')) return Promise.resolve({ data: [article('first', 'First story')] });
      if (url.includes('page=2&per_page=10')) return Promise.resolve({ data: [article('second', 'Second story')] });
      throw new Error(`Unexpected request: ${url}`);
    });
    renderNewsPage();

    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    act(() => observer.callback([{ boundingClientRect: { y: 100 } }]));
    act(() => observer.callback([{ boundingClientRect: { y: 50 } }]));

    expect(await screen.findByRole('link', { name: 'Second story' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'First story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/categories=10&.*&page=2&per_page=10$/));
  });

  it('uses Redux categories when no categories are cached', async () => {
    streams.get.mockResolvedValue({ data: [article('news-story', 'News story')] });
    renderNewsPage({ path: '/news', storedCategories: false });

    expect(await screen.findByRole('link', { name: 'News story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/categories=11&.*&page=1&per_page=10$/));
  });

  it('continues pagination using cached categories while Redux categories are unavailable', async () => {
    streams.get.mockImplementation((url) => (
      url.includes('page=1&')
        ? Promise.resolve({ data: [article('first', 'First story')] })
        : Promise.resolve({ data: [article('second', 'Second story')] })
    ));
    renderNewsPage({ initialCategories: [] });

    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    act(() => observer.callback([{ boundingClientRect: { y: 100 } }]));
    act(() => observer.callback([{ boundingClientRect: { y: 50 } }]));

    expect(await screen.findByRole('link', { name: 'Second story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/categories=10&.*&page=2&per_page=10$/));
  });

  it('does not request news when the selected category is unavailable', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderNewsPage({
      path: '/news',
      initialCategories: [{ id: 8, slug: 'exhibitions', name: 'Exhibitions' }],
    });

    expect(streams.get).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith('Category not found: /news');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('loads a cold route when categories arrive after storage is populated', async () => {
    streams.get.mockResolvedValue({ data: [article('news-story', 'News story')] });
    const { store } = renderNewsPage({ path: '/news', storedCategories: false, initialCategories: [] });
    sessionStorage.setItem('categories', JSON.stringify(categories));
    act(() => store.dispatch(fetchCategories.fulfilled(categories, 'request')));

    expect(await screen.findByRole('link', { name: 'News story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledOnce();
    expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/categories=11&.*&page=1&per_page=10$/));
  });

  it('disconnects pagination observation when the page unmounts', () => {
    streams.get.mockResolvedValue({ data: [] });
    const { unmount } = renderNewsPage();
    unmount();
    expect(observer.disconnect).toHaveBeenCalledOnce();
  });

  it('does not advance pagination while the first page is pending', async () => {
    const firstPage = deferred();
    streams.get.mockImplementation((url) => (
      url.includes('page=1&') ? firstPage.promise : Promise.resolve({ data: [article('second', 'Second story')] })
    ));
    const { store } = renderNewsPage({ storedCategories: false, initialCategories: [] });
    act(() => store.dispatch(fetchCategories.fulfilled(categories, 'request')));
    expect(streams.get).toHaveBeenCalledOnce();

    act(() => observer.callback([{ boundingClientRect: { y: 100 } }]));
    act(() => observer.callback([{ boundingClientRect: { y: 50 } }]));
    expect(streams.get).toHaveBeenCalledOnce();

    await act(async () => {
      firstPage.resolve({ data: [article('first', 'First story')] });
      await firstPage.promise;
    });
    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    act(() => observer.callback([{ boundingClientRect: { y: 25 } }]));

    expect(await screen.findByRole('link', { name: 'Second story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/page=2&per_page=10$/));
  });

  it('does not duplicate the previous page after a failed pagination request', async () => {
    let pageTwoRequests = 0;
    streams.get.mockImplementation((url) => {
      if (url.includes('page=1&')) return Promise.resolve({ data: [article('first', 'First story')] });
      pageTwoRequests += 1;
      return pageTwoRequests === 1
        ? Promise.reject(new Error('Network unavailable'))
        : Promise.resolve({ data: [article('second', 'Second story')] });
    });
    const { container } = renderNewsPage();
    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();

    act(() => observer.callback([{ boundingClientRect: { y: 100 } }]));
    act(() => observer.callback([{ boundingClientRect: { y: 50 } }]));
    await waitFor(() => expect(pageTwoRequests).toBe(1));
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
    expect(screen.getAllByRole('link', { name: 'First story' })).toHaveLength(1);

    act(() => observer.callback([{ boundingClientRect: { y: 25 } }]));
    expect(await screen.findByRole('link', { name: 'Second story' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'First story' })).toHaveLength(1);
    expect(container.querySelectorAll('.nae-item')).toHaveLength(2);
  });

  it('updates the visible list only from the latest fulfilled category request', async () => {
    const cachedPage = deferred();
    const refreshedPage = deferred();
    const refreshedCategories = categories.map((category) => ({ ...category, id: category.id + 100 }));
    const cachedStory = article('cached', 'Cached story');
    const refreshedStory = article('refreshed', 'Refreshed story');
    streams.get.mockImplementation((url) => (
      streams.get.mock.calls.length === 1 ? cachedPage.promise : refreshedPage.promise
    ));
    const { store } = renderNewsPage({ initialCategories: [] });
    act(() => store.dispatch(fetchCategories.fulfilled(refreshedCategories, 'refresh')));

    await act(async () => {
      cachedPage.resolve({ data: [cachedStory] });
      await cachedPage.promise;
    });
    expect(screen.queryByRole('link', { name: 'Cached story' })).not.toBeInTheDocument();

    await act(async () => {
      refreshedPage.resolve({ data: [refreshedStory] });
      await refreshedPage.promise;
    });
    expect(await screen.findByRole('link', { name: 'Refreshed story' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Cached story' })).not.toBeInTheDocument();
  });

  it('keeps the cached-category request when Redux refresh changes only metadata', async () => {
    const page = deferred();
    streams.get.mockReturnValue(page.promise);
    const { store } = renderNewsPage({ initialCategories: [] });

    act(() => store.dispatch(fetchCategories.fulfilled(
      categories.map((category) => ({ ...category, count: 10 })),
      'refresh',
    )));

    expect(streams.get).toHaveBeenCalledOnce();
    await act(async () => {
      page.resolve({ data: [article('cached-story', 'Cached story')] });
      await page.promise;
    });

    expect(await screen.findByRole('link', { name: 'Cached story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledOnce();
  });

  it('hides the pagination spinner after a news request fails', async () => {
    streams.get.mockRejectedValue(new Error('Network unavailable'));
    const { store } = renderNewsPage();

    await waitFor(() => expect(store.getState().newsError.newsError).toBe(true));
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });
});
