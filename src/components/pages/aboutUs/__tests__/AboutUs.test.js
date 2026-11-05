import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import publicStreams from '../../../../api/public';
import modalReducer from '../../../../store/modalSlice';
import rimBuildingImagesReducer from '../../../../store/rimBuildingImagesSlice';
import teamReducer from '../../../../store/teamSlice';
import messages from '../../../../translations/en.json';
import AboutUs from '../AboutUs';

vi.mock('../../../../api/public', () => ({ default: { get: vi.fn() } }));
vi.mock('../../../carousel/carouselImages', () => ({
  default: ({ listImages }) => (
    <div data-testid="building-gallery">
      {listImages
        ? listImages.map((image) => <img key={image.id} src={image.image} alt={`Building ${image.id}`} />)
        : 'Loading building images'}
    </div>
  ),
}));

const director = {
  id: 1,
  department: 'headmaster',
  nickname: 'director',
  name: 'Museum Director',
  role: 'Director',
  avatar: 'https://example.test/director.jpg',
  email: '',
  phone: '',
};
const curator = {
  id: 2,
  department: 'archeology',
  nickname: 'maya',
  name: 'Maya Curator',
  role: 'Curator',
  avatar: 'https://example.test/maya.jpg',
};
const historian = {
  id: 3,
  department: 'history',
  nickname: 'historian',
  name: 'Museum Historian',
  role: 'Historian',
};
const ethnographer = {
  id: 4,
  department: 'ethnography',
  nickname: 'ethnographer',
  name: 'Museum Ethnographer',
  role: 'Ethnographer',
};
const team = [director, curator, historian, ethnographer];
const buildingImages = [{ id: 1, image: 'https://example.test/building.jpg' }];

function mockPublicResponses() {
  publicStreams.get.mockImplementation((url) => {
    if (url === '/team.json') return Promise.resolve({ data: team });
    if (url === '/rim-building-images.json') return Promise.resolve({ data: buildingImages });
    throw new Error(`Unexpected request: ${url}`);
  });
}

function renderAboutUs(path = '/about-us') {
  window.history.replaceState(null, '', path);
  const store = configureStore({
    reducer: {
      modal: modalReducer,
      rimBuildingImages: rimBuildingImagesReducer,
      team: teamReducer,
    },
  });
  const result = render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <BrowserRouter>
          <Routes>
            <Route path="/about-us/:modalContent?" element={<AboutUs />} />
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
  return { ...result, store };
}

describe('AboutUs', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('shows placeholders while the team and building images are loading', () => {
    publicStreams.get.mockImplementation(() => new Promise(() => {}));
    renderAboutUs();

    expect(screen.getByTestId('building-gallery')).toHaveTextContent('Loading building images');
    expect(screen.getAllByRole('heading', { name: '...' }).length).toBeGreaterThan(0);
    expect(publicStreams.get).toHaveBeenCalledWith('/team.json');
    expect(publicStreams.get).toHaveBeenCalledWith('/rim-building-images.json');
  });

  it('renders the fetched building images and team departments', async () => {
    mockPublicResponses();
    renderAboutUs();

    expect(await screen.findByRole('heading', { name: 'Maya Curator' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Museum Director' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Museum Historian' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Museum Ethnographer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Department.*History/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Department.*Ethnography/ })).toBeInTheDocument();
    expect(await screen.findByRole('img', { name: 'Building 1' })).toHaveAttribute(
      'src',
      'https://example.test/building.jpg'
    );
    const links = screen.getAllByRole('link', { name: 'see here' });
    expect(links.find((link) => link.getAttribute('href') === '/support-us')).toBeInTheDocument();
    expect(links.find((link) => link.getAttribute('href') === '/about-us/regular-programs')).toBeInTheDocument();
  });

  it('opens the selected team member when the page is loaded from a profile URL', async () => {
    mockPublicResponses();
    const { store } = renderAboutUs('/about-us/maya');

    await waitFor(() => expect(store.getState().modal).toEqual({
      type: 'modal-team',
      user: curator,
      modalIsOpen: true,
    }));
    expect(screen.getByRole('heading', { name: 'Maya Curator' })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/about-us/maya');
  });

  it('opens the founder modal for its direct URL', async () => {
    mockPublicResponses();
    const { store } = renderAboutUs('/about-us/stoyu-shishkov');

    await waitFor(() => expect(store.getState().modal).toEqual({
      type: 'modal-shishkov',
      modalIsOpen: true,
    }));
    expect(window.location.pathname).toBe('/about-us/stoyu-shishkov');
  });

  it('does not open a modal for an unknown profile', async () => {
    mockPublicResponses();
    const { store } = renderAboutUs('/about-us/unknown');

    expect(await screen.findByRole('heading', { name: 'Maya Curator' })).toBeInTheDocument();
    await waitFor(() => expect(store.getState().team.defaultTeam).toHaveLength(team.length));
    expect(store.getState().modal).toEqual({});
  });

  it('opens a team profile and updates the URL when its card is selected', async () => {
    mockPublicResponses();
    const user = userEvent.setup();
    const { store } = renderAboutUs();

    const heading = await screen.findByRole('heading', { name: 'Maya Curator' });
    const card = heading.closest('.card__wrap');
    await user.click(within(card).getByRole('link', { name: 'see more' }));

    expect(store.getState().modal).toEqual({ type: 'modal-team', user: curator, modalIsOpen: true });
    expect(window.location.pathname).toBe('/about-us/maya');
  });

  it('opens the founder modal when the founder link is selected', async () => {
    mockPublicResponses();
    const user = userEvent.setup();
    const { store } = renderAboutUs();
    await screen.findByRole('heading', { name: 'Maya Curator' });

    await user.click(screen.getByRole('link', { name: 'Стою Неделев ШИШКОВ' }));

    expect(store.getState().modal).toEqual({ type: 'modal-shishkov', modalIsOpen: true });
    expect(window.location.pathname).toBe('/about-us/stoyu-shishkov');
  });

  it('renders regular programs instead of the main page for its route', async () => {
    mockPublicResponses();
    const { store } = renderAboutUs('/about-us/regular-programs');

    expect(screen.getByRole('heading', { name: 'Regular programs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: messages['the-international-museum-day'] })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/about-us');
    expect(screen.queryByRole('heading', { name: 'Мисия' })).not.toBeInTheDocument();
    await waitFor(() => expect(store.getState().team.defaultTeam).toHaveLength(team.length));
    expect(store.getState().modal).toEqual({});
  });
});
