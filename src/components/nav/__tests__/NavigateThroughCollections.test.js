import { configureStore } from '@reduxjs/toolkit';
import { act, render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import streams from '../../../api/streams';
import categoriesReducer from '../../../store/categoriesSlice';
import collectionsReducer from '../../../store/collectionsSlice';
import NavigateThroughCollections from '../NavigateThroughCollections';

vi.mock('../../../api/streams', () => ({ default: { get: vi.fn() } }));

const collections = [
  { id: 1, slug: 'archaeology', name: 'Archaeology' },
  { id: 2, slug: 'ethnography', name: 'Ethnography' },
  { id: 3, slug: 'icons', name: 'Icons' },
];

function renderNavigation({
  path = '/main-collections/intro/ethnography',
  collectionType = 'main-collections',
  categories = [],
} = {}) {
  window.history.replaceState(null, '', path);
  const store = configureStore({
    reducer: { categories: categoriesReducer, collections: collectionsReducer },
    preloadedState: { categories },
  });
  const tree = (type) => (
    <Provider store={store}>
      <IntlProvider locale="en">
        <BrowserRouter>
          <NavigateThroughCollections collectionType={type} />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
  const result = render(tree(collectionType));
  return {
    ...result,
    setCollectionType: (type) => result.rerender(tree(type)),
  };
}

describe('NavigateThroughCollections', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it.each([
    ['ethnography', 'Archaeology', 'archaeology', 'Icons', 'icons'],
    ['archaeology', 'Icons', 'icons', 'Ethnography', 'ethnography'],
    ['icons', 'Ethnography', 'ethnography', 'Archaeology', 'archaeology'],
    ['unknown', 'Icons', 'icons', 'Archaeology', 'archaeology'],
  ])('uses cached neighbours for %s, including wraparound', async (current, previous, previousSlug, next, nextSlug) => {
    sessionStorage.setItem('main-collections', JSON.stringify(collections));
    renderNavigation({ path: `/main-collections/intro/${current}` });

    expect(await screen.findByRole('link', { name: new RegExp(previous) }))
      .toHaveAttribute('href', `/main-collections/intro/${previousSlug}`);
    expect(screen.getByRole('link', { name: new RegExp(next) }))
      .toHaveAttribute('href', `/main-collections/intro/${nextSlug}`);
    expect(streams.get).not.toHaveBeenCalled();
  });

  it('waits without fetching when neither cached collections nor categories are available', () => {
    const { container } = renderNavigation();

    expect(container).toBeEmptyDOMElement();
    expect(streams.get).not.toHaveBeenCalled();
  });

  it('shows a spinner while fetching, then caches and displays collection neighbours', async () => {
    let resolveRequest;
    const request = new Promise((resolve) => {
      resolveRequest = resolve;
    });
    streams.get.mockReturnValue(request);
    renderNavigation({ categories: [{ id: 42, slug: 'main-collections', name: 'Main collections' }] });

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(streams.get).toHaveBeenCalledWith(
      '/categories?parent=42&_fields=id,name,slug,description&page=1&per_page=100'
    );

    await act(async () => {
      resolveRequest({ data: collections });
      await request;
    });

    expect(await screen.findByRole('link', { name: /Archaeology/ })).toHaveAttribute(
      'href',
      '/main-collections/intro/archaeology'
    );
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(JSON.parse(sessionStorage.getItem('main-collections'))).toEqual(collections);
  });

  it('fetches using cached categories when the collection cache is invalid', async () => {
    sessionStorage.setItem('main-collections', 'invalid JSON');
    sessionStorage.setItem('categories', JSON.stringify([{ id: 42, slug: 'main-collections' }]));
    streams.get.mockResolvedValue({ data: collections });

    renderNavigation();

    expect(await screen.findByRole('link', { name: /Icons/ })).toHaveAttribute(
      'href',
      '/main-collections/intro/icons'
    );
    expect(streams.get).toHaveBeenCalledWith(
      '/categories?parent=42&_fields=id,name,slug,description&page=1&per_page=100'
    );
    expect(JSON.parse(sessionStorage.getItem('main-collections'))).toEqual(collections);
  });

  it('stops showing the spinner after a failed request', async () => {
    streams.get.mockRejectedValue(new Error('Network unavailable'));
    const { container } = renderNavigation({
      categories: [{ id: 42, slug: 'main-collections' }],
    });

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
    expect(container).toBeEmptyDOMElement();
    expect(sessionStorage.getItem('main-collections')).toBeNull();
  });

  it('switches to the cached collection type when its prop changes', async () => {
    const virtualCollections = [
      { id: 4, slug: 'photos', name: 'Photos' },
      { id: 5, slug: 'ethnography', name: 'Ethnography' },
      { id: 6, slug: 'documents', name: 'Documents' },
    ];
    sessionStorage.setItem('main-collections', JSON.stringify(collections));
    sessionStorage.setItem('virtual-collections', JSON.stringify(virtualCollections));
    const { setCollectionType } = renderNavigation();

    expect(await screen.findByRole('link', { name: /Archaeology/ })).toBeInTheDocument();
    setCollectionType('virtual-collections');

    expect(await screen.findByRole('link', { name: /Photos/ })).toHaveAttribute(
      'href',
      '/virtual-collections/intro/photos'
    );
    expect(screen.getByRole('link', { name: /Documents/ })).toHaveAttribute(
      'href',
      '/virtual-collections/intro/documents'
    );
    expect(streams.get).not.toHaveBeenCalled();
  });
});
