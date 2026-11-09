import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import streams from '../../../../api/streams';
import collectionsReducer from '../../../../store/collectionsSlice';
import itemReducer from '../../../../store/itemFromCollectionSlice';
import messages from '../../../../translations/en.json';
import CollectionsDetailItem from '../CollectionsDetailItem';

vi.mock('../../../../api/streams', () => ({ default: { get: vi.fn() } }));
vi.mock('react-bootstrap/Spinner', () => ({
  default: vi.fn(() => <div role="status" />),
}));
vi.mock('yet-another-react-lightbox', () => ({
  default: ({ open, close, slides }) => open ? (
    <div role="dialog" aria-label="Image preview">
      <img alt="Enlarged item" src={slides[0].src} />
      <button onClick={close}>Close preview</button>
    </div>
  ) : null,
}));

const noImage = 'https://api-staging.museumsmolyan.eu/wp-content/uploads/2024/10/no-image.png';
const vase = {
  id: 2,
  slug: 'vase',
  title: { rendered: 'Ancient vase' },
  content: { rendered: '<strong>Rare artifact</strong>' },
  collection_item_material: 'Clay',
  collection_item_size: '20 cm',
  collection_item_dating: 'First century',
  collection_item_location: 'Smolyan',
  collection_item_inventory_number: 'A-42',
  _embedded: { 'wp:featuredmedia': [{ source_url: 'https://example.test/vase.jpg' }] },
};
const previous = {
  ...vase,
  id: 1,
  slug: 'plate',
  title: { rendered: 'Ceramic plate' },
  _embedded: {},
};
const next = {
  ...vase,
  id: 3,
  slug: 'chalice',
  title: { rendered: 'Silver chalice' },
  _embedded: { 'wp:featuredmedia': [{ source_url: 'https://example.test/chalice.jpg' }] },
};

function KeyedDetail() {
  const { pathname } = useLocation();
  return <CollectionsDetailItem key={pathname} />;
}

function renderDetail({ desktop = true, collection = [], path = '/main-collections/detail/ethnography/vase' } = {}) {
  window.history.replaceState(null, '', path);
  const media = {
    matches: desktop,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  };
  vi.stubGlobal('matchMedia', vi.fn(() => media));
  const store = configureStore({
    reducer: { collections: collectionsReducer, itemFomCollection: itemReducer },
    preloadedState: { collections: { main: [], virtual: [], byType: collection, description: [], error: [] } },
  });
  const result = render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <BrowserRouter>
          <Link to="/main-collections/detail/ethnography/chalice">Next item</Link>
          <Routes>
            <Route path="/:host/detail/:type/:item" element={<KeyedDetail />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
  return { ...result, media, store };
}

describe('CollectionsDetailItem', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete Element.prototype.scrollIntoView;
    sessionStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('loads the item, renders its details and opens and closes its image', async () => {
    let resolveRequest;
    const request = new Promise((resolve) => {
      resolveRequest = resolve;
    });
    streams.get.mockReturnValue(request);
    const user = userEvent.setup();
    renderDetail();

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(expect.stringContaining('/posts?slug=vase'));
    await act(async () => {
      resolveRequest({ data: [vase] });
      await request;
    });

    expect(await screen.findByRole('heading', { name: 'Ancient vase' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute(
      'href',
      '/main-collections/intro/ethnography#gallery'
    );
    expect(screen.getByText('Clay')).toBeInTheDocument();
    expect(screen.getByText('20 cm')).toBeInTheDocument();
    expect(screen.getByText('First century')).toBeInTheDocument();
    expect(screen.getByText('Smolyan')).toBeInTheDocument();
    expect(screen.getByText('A-42')).toBeInTheDocument();
    expect(screen.getByText('Rare artifact', { selector: 'strong' })).toBeInTheDocument();

    const image = screen.getByRole('img', { name: 'Ancient vase' });
    expect(image).toHaveAttribute('src', 'https://example.test/vase.jpg');
    await user.click(image.closest('.collections-item__img__wrap'));
    const preview = screen.getByRole('dialog', { name: 'Image preview' });
    expect(within(preview).getByAltText('Enlarged item')).toHaveAttribute('src', 'https://example.test/vase.jpg');
    await user.click(within(preview).getByRole('button', { name: 'Close preview' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('uses the fallback image for both the item and its lightbox', async () => {
    streams.get.mockResolvedValue({ data: [{ ...vase, _embedded: {} }] });
    const user = userEvent.setup();
    renderDetail();

    const image = await screen.findByRole('img', { name: 'Ancient vase' });
    expect(image).toHaveAttribute('src', noImage);
    await user.click(image.closest('.collections-item__img__wrap'));
    expect(screen.getByAltText('Enlarged item')).toHaveAttribute('src', noImage);
  });

  it('uses an existing collection for desktop arrow navigation without fetching it again', async () => {
    sessionStorage.setItem('categories', JSON.stringify([{ id: 42, slug: 'ethnography' }]));
    streams.get.mockResolvedValue({ data: [vase] });
    const user = userEvent.setup();
    const { container } = renderDetail({ collection: [previous, vase, next] });

    await screen.findByRole('heading', { name: 'Ancient vase' });
    await waitFor(() => {
      expect(container.querySelector('.collection-items-arrow-navigation .left-arrow')).toHaveAttribute(
        'href',
        '/main-collections/detail/ethnography/plate'
      );
      expect(container.querySelector('.collection-items-arrow-navigation .right-arrow')).toHaveAttribute(
        'href',
        '/main-collections/detail/ethnography/chalice'
      );
    });
    const previousLink = container.querySelector('.collection-items-arrow-navigation .left-arrow');

    await user.hover(previousLink);
    expect(screen.getByRole('heading', { name: 'Ceramic plate' })).toBeInTheDocument();
    expect(screen.getByText('1/3')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Ceramic plate' })).toHaveAttribute('src', noImage);
    expect(streams.get).toHaveBeenCalledTimes(1);
  });

  it('fetches the collection from cached categories for mobile navigation', async () => {
    sessionStorage.setItem('categories', JSON.stringify([{ id: 42, slug: 'ethnography' }]));
    streams.get.mockImplementation((url) => {
      if (url.startsWith('/posts?slug=vase')) return Promise.resolve({ data: [vase] });
      if (url.startsWith('/posts?categories=42')) return Promise.resolve({ data: [previous, vase, next] });
      throw new Error(`Unexpected request: ${url}`);
    });
    const { container } = renderDetail({ desktop: false });

    expect(await screen.findByRole('heading', { name: 'Ancient vase' })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /Ceramic plate/ })).toHaveAttribute(
      'href',
      '/main-collections/detail/ethnography/plate'
    );
    expect(screen.getByRole('link', { name: /Silver chalice/ })).toHaveAttribute(
      'href',
      '/main-collections/detail/ethnography/chalice'
    );
    expect(container.querySelector('.collection-items-arrow-navigation')).not.toBeInTheDocument();
    expect(container.querySelector('.collection-items-arrow-navigation_bottom')).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(expect.stringContaining('/posts?categories=42'));
  });

  it('reports invalid cached categories while still loading the requested item', async () => {
    sessionStorage.setItem('categories', 'invalid JSON');
    streams.get.mockResolvedValue({ data: [vase] });
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    renderDetail();

    expect(await screen.findByRole('heading', { name: 'Ancient vase' })).toBeInTheDocument();
    expect(error).toHaveBeenCalledWith('Error parsing categories:', expect.any(SyntaxError));
    expect(streams.get).toHaveBeenCalledTimes(1);
  });

  it('loads the newly selected item when the route changes', async () => {
    streams.get.mockImplementation((url) => {
      if (url.startsWith('/posts?slug=vase')) return Promise.resolve({ data: [vase] });
      if (url.startsWith('/posts?slug=chalice')) return Promise.resolve({ data: [next] });
      throw new Error(`Unexpected request: ${url}`);
    });
    const user = userEvent.setup();
    renderDetail();

    expect(await screen.findByRole('heading', { name: 'Ancient vase' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Next item' }));

    expect(await screen.findByRole('heading', { name: 'Silver chalice' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Silver chalice' })).toHaveAttribute(
      'src',
      'https://example.test/chalice.jpg'
    );
    expect(streams.get).toHaveBeenCalledWith(expect.stringContaining('/posts?slug=chalice'));
  });

  it.each([
    ['virtual-collections', true],
    ['virtual-collections', false],
    ['main-collections', true],
    ['main-collections', false],
  ])('does not flash a spinner during %s arrow navigation (desktop: %s)', async (host, desktop) => {
    let resolveRequest;
    const request = new Promise((resolve) => {
      resolveRequest = resolve;
    });
    streams.get.mockImplementation((url) => {
      if (url.startsWith('/posts?slug=vase')) return Promise.resolve({ data: [vase] });
      if (url.startsWith('/posts?slug=chalice')) return request;
      throw new Error(`Unexpected request: ${url}`);
    });
    const user = userEvent.setup();
    const { container } = renderDetail({
      desktop,
      collection: [previous, vase, next],
      path: `/${host}/detail/ethnography/vase`,
    });
    await screen.findByRole('heading', { name: 'Ancient vase' });
    await waitFor(() => {
      expect(desktop
        ? container.querySelector('.collection-items-arrow-navigation .right-arrow')
        : screen.getByRole('link', { name: /Silver chalice/ })
      ).toHaveAttribute('href', `/${host}/detail/ethnography/chalice`);
    });
    Spinner.mockClear();

    await user.click(desktop
      ? container.querySelector('.collection-items-arrow-navigation .right-arrow')
      : screen.getByRole('link', { name: /Silver chalice/ }));

    expect(window.location.pathname).toBe(`/${host}/detail/ethnography/chalice`);
    expect(Spinner).not.toHaveBeenCalled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ancient vase', level: 2 })).toBeInTheDocument();

    await act(async () => {
      resolveRequest({ data: [next] });
      await request;
    });
    expect(await screen.findByRole('heading', { name: 'Silver chalice' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Silver chalice' })).toHaveAttribute(
      'src',
      'https://example.test/chalice.jpg'
    );
  });
});
