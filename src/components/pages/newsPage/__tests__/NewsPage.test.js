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
    observer = this;
  }
}

function renderNewsPage({
  path = '/news-and-events',
  storedCategories = true,
  initialCategories = categories,
  initialNews = {},
} = {}) {
  window.history.replaceState(null, '', path);
  if (storedCategories) {
    sessionStorage.setItem('categories', JSON.stringify(
      Array.isArray(storedCategories) ? storedCategories : categories
    ));
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
    vi.restoreAllMocks();
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

  it.each([
    ['/news-and-events', 10, false],
    ['/news', 11, false],
    ['/events', 12, false],
    ['/news-and-events', 10, []],
  ])('loads %s once when categories arrive after mount (category %i, cache %j)', async (path, categoryId, storedCategories) => {
    streams.get.mockResolvedValue({ data: [article('first-story', 'First story')] });
    const { store } = renderNewsPage({ path, storedCategories, initialCategories: [] });

    expect(streams.get).not.toHaveBeenCalled();
    act(() => {
      store.dispatch(fetchCategories.fulfilled(categories, 'categories'));
      sessionStorage.setItem('categories', JSON.stringify(categories));
    });

    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(1);
    expect(streams.get).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(`categories=${categoryId}&.*&page=1&per_page=10$`))
    );
  });

  it('loads the selected category if the tab changes before categories arrive', async () => {
    streams.get.mockResolvedValue({ data: [article('news-story', 'News story')] });
    const user = userEvent.setup();
    const { store } = renderNewsPage({ storedCategories: false, initialCategories: [] });

    await user.click(screen.getByRole('button', { name: 'Новини' }));
    expect(streams.get).not.toHaveBeenCalled();
    act(() => store.dispatch(fetchCategories.fulfilled(categories, 'categories')));

    expect(await screen.findByRole('link', { name: 'News story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(1);
    expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/categories=11&.*&page=1&per_page=10$/));
  });

  it.each(['before', 'after'])(
    'uses cached categories without duplicating articles when Redux catches up %s the news response',
    async (categoriesTiming) => {
      const response = deferred();
      const refreshedCategories = categories.map((category) => ({ ...category, count: 10 }));
      streams.get.mockReturnValue(response.promise);
      const { store } = renderNewsPage({ initialCategories: [] });

      expect(streams.get).toHaveBeenCalledTimes(1);
      if (categoriesTiming === 'before') {
        act(() => store.dispatch(fetchCategories.fulfilled(refreshedCategories, 'categories')));
      }

      await act(async () => response.resolve({ data: [article('cached-story', 'Cached story')] }));
      expect(await screen.findByRole('link', { name: 'Cached story' })).toBeInTheDocument();

      if (categoriesTiming === 'after') {
        act(() => store.dispatch(fetchCategories.fulfilled(refreshedCategories, 'categories')));
      }
      expect(screen.getAllByRole('link', { name: 'Cached story' })).toHaveLength(1);
      expect(streams.get).toHaveBeenCalledTimes(1);
      expect(streams.get).toHaveBeenCalledWith(expect.stringMatching(/categories=10&.*&page=1&per_page=10$/));
    }
  );

  it('does not advance pagination before categories have loaded', async () => {
    streams.get.mockImplementation((url) => {
      if (url.includes('page=1&')) return Promise.resolve({ data: [article('first', 'First story')] });
      if (url.includes('page=2&')) return Promise.resolve({ data: [article('second', 'Second story')] });
      throw new Error(`Unexpected request: ${url}`);
    });
    const { store } = renderNewsPage({ storedCategories: false, initialCategories: [] });

    act(() => observer.callback([{ boundingClientRect: { y: 100 } }]));
    act(() => observer.callback([{ boundingClientRect: { y: 50 } }]));
    expect(streams.get).not.toHaveBeenCalled();

    act(() => store.dispatch(fetchCategories.fulfilled(categories, 'categories')));
    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    act(() => observer.callback([{ boundingClientRect: { y: 25 } }]));
    expect(await screen.findByRole('link', { name: 'Second story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(2);
    expect(streams.get).toHaveBeenLastCalledWith(expect.stringMatching(/categories=10&.*&page=2&per_page=10$/));
  });

  it('paginates and switches category using Redux categories when storage is empty', async () => {
    streams.get.mockImplementation((url) => {
      if (url.includes('categories=10') && url.includes('page=1&')) {
        return Promise.resolve({ data: [article('first', 'First story')] });
      }
      if (url.includes('categories=10') && url.includes('page=2&')) {
        return Promise.resolve({ data: [article('second', 'Second story')] });
      }
      if (url.includes('categories=11') && url.includes('page=1&')) {
        return Promise.resolve({ data: [article('news-story', 'News story')] });
      }
      throw new Error(`Unexpected request: ${url}`);
    });
    const user = userEvent.setup();
    renderNewsPage({ storedCategories: false });

    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    act(() => observer.callback([{ boundingClientRect: { y: 100 } }]));
    act(() => observer.callback([{ boundingClientRect: { y: 50 } }]));
    expect(await screen.findByRole('link', { name: 'Second story' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Новини' }));
    expect(await screen.findByRole('link', { name: 'News story' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'First story' })).not.toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(3);
  });

  it('reports a missing category without requesting an undefined category', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderNewsPage({
      storedCategories: false,
      initialCategories: [{ id: 8, slug: 'exhibitions', name: 'Exhibitions' }],
    });

    expect(streams.get).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith('Category not found: /news-and-events');
  });

  it('hides the pagination spinner after a news request fails', async () => {
    streams.get.mockRejectedValue(new Error('Network unavailable'));
    const { store } = renderNewsPage();

    await waitFor(() => expect(store.getState().newsError.newsError).toBe(true));
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });
});
