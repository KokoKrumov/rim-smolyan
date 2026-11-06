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

function renderHome(initialCategories = []) {
  const store = configureStore({
    reducer: { categories: categoriesReducer, news: newsReducer },
    preloadedState: { categories: initialCategories },
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
});
