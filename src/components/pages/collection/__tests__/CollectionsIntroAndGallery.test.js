import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import streams from '../../../../api/streams';
import categoriesReducer, { fetchCategories } from '../../../../store/categoriesSlice';
import collectionsReducer from '../../../../store/collectionsSlice';
import CollectionsIntroAndGallery from '../CollectionsIntroAndGallery';

vi.mock('../../../../api/streams', () => ({ default: { get: vi.fn() } }));
vi.mock('../../../nav/NavigateThroughCollections', () => ({
  default: ({ collectionType, currentIndex }) => (
    <div data-testid="collection-navigation" data-type={collectionType} data-path={currentIndex} />
  ),
}));

const messages = {
  collection: 'Collection',
  introduction: 'Introduction',
  gallery: 'Gallery',
  'collection-introduction': 'Collection introduction',
  'collection-not-exist': 'Collection not found',
  'gallery-intro': 'Explore the objects',
  'gallery-empty': 'No gallery objects',
  'main-collections': 'Main collections',
};

const ethnography = {
  id: 42,
  slug: 'ethnography',
  name: 'Ethnography',
  description: JSON.stringify({ image_hero: 'https://example.test/ethnography.jpg' }),
};

const vase = {
  id: 1,
  slug: 'vase',
  title: { rendered: 'Ancient vase' },
  _embedded: { 'wp:featuredmedia': [{ source_url: 'https://example.test/vase.jpg', title: 'Vase' }] },
};

function mockCollectionResponses({ descriptions = {}, items = {} } = {}) {
  streams.get.mockImplementation((url) => {
    const slug = url.match(/\/posts\?slug=([^&]+)/)?.[1];
    const category = url.match(/\/posts\?categories=([^&]+)/)?.[1];
    if (slug && Object.hasOwn(descriptions, slug)) {
      const response = descriptions[slug];
      return response instanceof Error ? Promise.reject(response) : Promise.resolve({ data: response });
    }
    if (category && Object.hasOwn(items, category)) {
      const response = items[category];
      return response instanceof Error ? Promise.reject(response) : Promise.resolve({ data: response });
    }
    throw new Error(`Unexpected request: ${url}`);
  });
}

function renderGallery({
  path = '/main-collections/intro/ethnography',
  categories = [ethnography],
} = {}) {
  window.history.replaceState(null, '', path);
  const store = configureStore({
    reducer: { categories: categoriesReducer, collections: collectionsReducer },
    preloadedState: { categories },
  });
  const result = render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <BrowserRouter>
          <Link to="/main-collections/intro/icons">Next collection</Link>
          <Routes>
            <Route path="/:host/intro/:type" element={<CollectionsIntroAndGallery />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
  return { ...result, store };
}

describe('CollectionsIntroAndGallery', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('loads the description and gallery, then switches between the tabs', async () => {
    let resolveDescription;
    const descriptionRequest = new Promise((resolve) => {
      resolveDescription = resolve;
    });
    streams.get.mockImplementation((url) => {
      if (url.startsWith('/posts?slug=ethnography')) return descriptionRequest;
      if (url.startsWith('/posts?categories=42')) return Promise.resolve({ data: [vase] });
      throw new Error(`Unexpected request: ${url}`);
    });
    const user = userEvent.setup();
    const { container } = renderGallery();

    expect(screen.getByRole('status')).toBeInTheDocument();
    await act(async () => {
      resolveDescription({
        data: [{ title: { rendered: 'Ethnography collection' }, content: { rendered: '<p>Collection history</p>' } }],
      });
      await descriptionRequest;
    });

    expect(await screen.findByRole('heading', { name: 'Ethnography collection', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Collection history')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(container.querySelector('.hero-collection .hero-bg')).toHaveStyle(
      'background-image: url("https://example.test/ethnography.jpg")'
    );
    expect(screen.getByTestId('collection-navigation')).toHaveAttribute('data-type', 'main-collections');
    expect(screen.getByTestId('collection-navigation')).toHaveAttribute('data-path', '/main-collections/intro/ethnography');

    await user.click(screen.getByRole('tab', { name: 'Gallery' }));

    expect(screen.getByRole('tab', { name: 'Gallery' })).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByRole('link', { name: /Ancient vase/ })).toHaveAttribute(
      'href',
      '/main-collections/detail/ethnography/vase'
    );
    expect(screen.getByAltText('Vase')).toHaveAttribute('src', 'https://example.test/vase.jpg');
    await user.click(screen.getByRole('tab', { name: 'Introduction' }));
    expect(screen.getByRole('tab', { name: 'Introduction' })).toHaveAttribute('aria-selected', 'true');
  });

  it('starts on the gallery tab when the URL contains the gallery hash', async () => {
    mockCollectionResponses({ descriptions: { ethnography: [] }, items: { 42: [vase] } });
    renderGallery({ path: '/main-collections/intro/ethnography#gallery' });

    expect(await screen.findByRole('tab', { name: 'Gallery' })).toHaveAttribute('aria-selected', 'true');
    expect(await screen.findByRole('link', { name: /Ancient vase/ })).toHaveAttribute(
      'href',
      '/main-collections/detail/ethnography/vase'
    );
  });

  it('shows an empty gallery when only a description exists', async () => {
    mockCollectionResponses({
      descriptions: {
        ethnography: [{ title: { rendered: 'Ethnography' }, content: { rendered: '<p>History only</p>' } }],
      },
      items: { 42: [] },
    });
    const user = userEvent.setup();
    renderGallery();

    expect(await screen.findByText('History only')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Gallery' }));
    expect(screen.getByText('No gallery objects')).toBeInTheDocument();
  });

  it('shows the missing-collection message and disables its tabs when both requests are empty', async () => {
    mockCollectionResponses({ descriptions: { ethnography: [] }, items: { 42: [] } });
    renderGallery();

    expect(await screen.findByRole('heading', { name: 'Collection not found' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Introduction' })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('tab', { name: 'Gallery' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('uses categories from session storage when Redux has none', async () => {
    sessionStorage.setItem('categories', JSON.stringify([ethnography]));
    mockCollectionResponses({ descriptions: { ethnography: [] }, items: { 42: [vase] } });
    renderGallery({ categories: [] });

    expect(await screen.findByRole('heading', { name: 'Ethnography', level: 1 })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(expect.stringContaining('/posts?categories=42'));
  });

  it('starts loading when categories arrive after mount', async () => {
    mockCollectionResponses({ descriptions: { ethnography: [] }, items: { 42: [vase] } });
    const { store } = renderGallery({ categories: [] });

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(streams.get).not.toHaveBeenCalled();
    act(() => {
      store.dispatch(fetchCategories.fulfilled([ethnography], 'request-id'));
    });

    expect(await screen.findByRole('heading', { name: 'Ethnography', level: 1 })).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(expect.stringContaining('/posts?categories=42'));
  });

  it('still shows items when the description request fails', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockCollectionResponses({
      descriptions: { ethnography: new Error('Description unavailable') },
      items: { 42: [vase] },
    });
    const user = userEvent.setup();
    renderGallery();

    expect(await screen.findByRole('heading', { name: 'Ethnography', level: 1 })).toBeInTheDocument();
    expect(error).toHaveBeenCalledWith(
      'Error fetching collection description:',
      expect.objectContaining({ message: 'Description unavailable' })
    );
    await user.click(screen.getByRole('tab', { name: 'Gallery' }));
    expect(await screen.findByRole('link', { name: /Ancient vase/ })).toBeInTheDocument();
  });

  it('retains the description when fetching gallery items fails', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockCollectionResponses({
      descriptions: {
        ethnography: [{ title: { rendered: 'Ethnography' }, content: { rendered: '<p>History survives</p>' } }],
      },
      items: { 42: new Error('Items unavailable') },
    });
    const user = userEvent.setup();
    renderGallery();

    expect(await screen.findByText('History survives')).toBeInTheDocument();
    expect(error).toHaveBeenCalledWith('Error fetching collection:', expect.objectContaining({ message: 'Items unavailable' }));
    await user.click(screen.getByRole('tab', { name: 'Gallery' }));
    expect(screen.getByText('No gallery objects')).toBeInTheDocument();
  });

  it('loads the new category when navigating to a different collection', async () => {
    const icons = { id: 43, slug: 'icons', name: 'Icons', description: '' };
    mockCollectionResponses({
      descriptions: {
        ethnography: [{ title: { rendered: 'First collection' }, content: { rendered: 'First description' } }],
        icons: [{ title: { rendered: 'Second collection' }, content: { rendered: 'Second description' } }],
      },
      items: { 42: [vase], 43: [] },
    });
    const user = userEvent.setup();
    renderGallery({ categories: [ethnography, icons] });

    expect(await screen.findByText('First description')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Next collection' }));

    expect(await screen.findByText('Second description')).toBeInTheDocument();
    expect(screen.queryByText('First description')).not.toBeInTheDocument();
    expect(screen.getByTestId('collection-navigation')).toHaveAttribute('data-path', '/main-collections/intro/icons');
    await waitFor(() => expect(streams.get).toHaveBeenCalledWith(expect.stringContaining('/posts?categories=43')));
  });
});
