import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen, waitFor } from '@testing-library/react';
import { StrictMode } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import streams from '../../../../api/streams';
import categoriesReducer, { fetchCategories } from '../../../../store/categoriesSlice';
import newsReducer, { resetFetchNews } from '../../../../store/newsSlice';
import messages from '../../../../translations/en.json';
import HomePage from '../HomePage';

vi.mock('../../../../api/streams', () => ({ default: { get: vi.fn() } }));
vi.mock('../../../hero/Hero', () => ({ default: () => null }));
vi.mock('../../../infoLine/WorkInfoLine', () => ({ default: () => null }));
vi.mock('../../../infoColumn/InfoColumn', () => ({ default: () => null }));
vi.mock('../../../carousel/carouselMegatron', () => ({ default: () => null }));
vi.mock('../../../carousel/CarouselMegatronMobile', () => ({ default: () => null }));

const categories = [{ id: 2, slug: 'news-and-events', name: 'News and events' }];
const articles = [
  { id: 1, slug: 'first', title: { rendered: 'First story' } },
  { id: 2, slug: 'second', title: { rendered: 'Second story' } },
  { id: 3, slug: 'third', title: { rendered: 'Third story' } },
];
const newsUrl = '/posts?categories=2&_fields=id,date_gmt,slug,title,excerpt,event_date,event_place,_links,_embedded&_embed&page=1&per_page=3';

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function renderHomePage(initialCategories = [], strictMode = false) {
  const store = configureStore({
    reducer: { news: newsReducer, categories: categoriesReducer },
    preloadedState: { categories: initialCategories },
  });
  const page = (
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
  render(strictMode ? <StrictMode>{page}</StrictMode> : page);
  return store;
}

describe('HomePage news', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('loads three stories once when categories arrive after the page mounts', async () => {
    const response = deferred();
    streams.get.mockReturnValue(response.promise);
    const store = renderHomePage();

    expect(streams.get).not.toHaveBeenCalled();
    act(() => {
      store.dispatch(fetchCategories.fulfilled(categories, 'categories'));
      sessionStorage.setItem('categories', JSON.stringify(categories));
    });

    expect(streams.get).toHaveBeenCalledTimes(1);
    expect(streams.get).toHaveBeenCalledWith(newsUrl);
    expect(screen.getByRole('status')).toHaveClass('spinner-border');

    act(() => store.dispatch(resetFetchNews()));
    expect(streams.get).toHaveBeenCalledTimes(1);

    await act(async () => response.resolve({ data: articles }));
    for (const article of articles) {
      expect(await screen.findByRole('link', { name: article.title.rendered })).toHaveAttribute(
        'href', `/news-and-events/${article.slug}`
      );
    }
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledTimes(1);
  });

  it('stops loading when the news response is empty', async () => {
    const response = deferred();
    streams.get.mockReturnValue(response.promise);
    renderHomePage(categories);

    expect(screen.getByRole('status')).toHaveClass('spinner-border');
    await act(async () => response.resolve({ data: [] }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'First story' })).not.toBeInTheDocument();
  });

  it('loads on mount when Redux already has categories but storage is empty', async () => {
    streams.get.mockResolvedValue({ data: articles });
    renderHomePage(categories);

    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledExactlyOnceWith(newsUrl);
  });

  it('waits for categories when the cached list is empty', async () => {
    sessionStorage.setItem('categories', '[]');
    streams.get.mockResolvedValue({ data: articles });
    const store = renderHomePage();

    expect(streams.get).not.toHaveBeenCalled();
    act(() => {
      store.dispatch(fetchCategories.fulfilled(categories, 'categories'));
      sessionStorage.setItem('categories', JSON.stringify(categories));
    });

    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledExactlyOnceWith(newsUrl);
  });

  it('renders news after React remounts the page while a request is pending', async () => {
    const response = deferred();
    streams.get.mockReturnValue(response.promise);
    renderHomePage(categories, true);

    await act(async () => response.resolve({ data: articles }));
    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
  });

  it.each(['before', 'after'])(
    'uses cached categories without refetching when Redux catches up %s the news response',
    async (categoriesTiming) => {
      const response = deferred();
      const refreshedCategories = [{ ...categories[0], count: 10 }];
      sessionStorage.setItem('categories', JSON.stringify(categories));
      streams.get.mockReturnValue(response.promise);
      const store = renderHomePage();

      expect(streams.get).toHaveBeenCalledExactlyOnceWith(newsUrl);
      if (categoriesTiming === 'before') {
        act(() => store.dispatch(fetchCategories.fulfilled(refreshedCategories, 'categories')));
      }

      await act(async () => response.resolve({ data: articles }));
      expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();

      if (categoriesTiming === 'after') {
        act(() => store.dispatch(fetchCategories.fulfilled(refreshedCategories, 'categories')));
      }
      expect(streams.get).toHaveBeenCalledExactlyOnceWith(newsUrl);
      expect(screen.getAllByRole('link', { name: 'First story' })).toHaveLength(1);
    }
  );

  it('keeps the newest category response when a cached category changes', async () => {
    const cachedResponse = deferred();
    const freshResponse = deferred();
    sessionStorage.setItem('categories', JSON.stringify(categories));
    streams.get.mockImplementation((url) => {
      if (url === newsUrl) return cachedResponse.promise;
      if (url === newsUrl.replace('categories=2', 'categories=99')) return freshResponse.promise;
      throw new Error(`Unexpected request: ${url}`);
    });
    const store = renderHomePage();

    expect(streams.get).toHaveBeenCalledExactlyOnceWith(newsUrl);
    act(() => store.dispatch(fetchCategories.fulfilled([{ ...categories[0], id: 99 }], 'categories')));
    expect(streams.get).toHaveBeenCalledTimes(2);
    expect(streams.get).toHaveBeenLastCalledWith(newsUrl.replace('categories=2', 'categories=99'));

    await act(async () => freshResponse.resolve({ data: [articles[1]] }));
    await act(async () => cachedResponse.resolve({ data: [articles[0]] }));
    expect(screen.getByRole('link', { name: 'Second story' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'First story' })).not.toBeInTheDocument();
  });

  it('keeps loading until the newest category request finishes', async () => {
    const cachedResponse = deferred();
    const freshResponse = deferred();
    sessionStorage.setItem('categories', JSON.stringify(categories));
    streams.get.mockImplementation((url) => {
      if (url === newsUrl) return cachedResponse.promise;
      if (url === newsUrl.replace('categories=2', 'categories=99')) return freshResponse.promise;
      throw new Error(`Unexpected request: ${url}`);
    });
    const store = renderHomePage();

    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => store.dispatch(fetchCategories.fulfilled([{ ...categories[0], id: 99 }], 'categories')));

    await act(async () => cachedResponse.resolve({ data: [articles[0]] }));
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'First story' })).not.toBeInTheDocument();

    await act(async () => freshResponse.resolve({ data: [articles[1]] }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Second story' })).toBeInTheDocument();
  });

  it('reports a missing category without requesting an undefined category', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderHomePage([{ id: 8, slug: 'exhibitions', name: 'Exhibitions' }]);

    expect(streams.get).not.toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith('Category not found: news-and-events');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('reports a failed news request', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const response = deferred();
    streams.get.mockReturnValue(response.promise);
    renderHomePage(categories);

    expect(screen.getByRole('status')).toBeInTheDocument();
    await act(async () => response.reject(new Error('Network unavailable')));
    await waitFor(() => expect(log).toHaveBeenCalledWith(
      'Failed to load news', expect.objectContaining({ message: 'Network unavailable' })
    ));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'First story' })).not.toBeInTheDocument();
  });

  it('keeps previously loaded news after a refresh fails', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const freshResponse = deferred();
    streams.get
      .mockResolvedValueOnce({ data: [articles[0]] })
      .mockReturnValueOnce(freshResponse.promise);
    const store = renderHomePage(categories);

    expect(await screen.findByRole('link', { name: 'First story' })).toBeInTheDocument();
    act(() => store.dispatch(fetchCategories.fulfilled([{ ...categories[0], id: 99 }], 'categories')));
    expect(screen.getByRole('status')).toBeInTheDocument();

    await act(async () => freshResponse.reject(new Error('Network unavailable')));
    expect(log).toHaveBeenCalledWith(
      'Failed to load news', expect.objectContaining({ message: 'Network unavailable' })
    );
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'First story' })).toBeInTheDocument();
  });
});
