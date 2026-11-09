import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import modalReducer from '../../../store/modalSlice';
import messages from '../../../translations/en.json';
import ModalTeamContent from '../ModalTeamContent';

const member = {
  nickname: 'maya',
  name: 'Maya Curator',
  profession: 'Archaeologist',
  avatar: 'https://example.test/maya.jpg',
  phone: '<a href="tel:+123456789">+123456789</a>',
  email: '<a href="mailto:maya@example.test">maya@example.test</a>',
  year: '1985',
  education: '<p>University degree</p>',
  past_professions: '<p>Museum experience</p>',
  interests: {
    main: '<p>Ancient pottery</p>',
    research: '<p>Research project</p>',
    exhibitions: '<p>Museum exhibition</p>',
    participation: '<p>Conference participation</p>',
    project_participation: '<p>Project participation</p>',
    professional_skills: '<p>Conservation skills</p>',
    organisations: '<p>Museum association</p>',
    publications: '<p>Published <em>catalogue</em></p>',
  },
};

function renderTeamModal({ user = member, path = '/about-us/maya', width = 1600 } = {}) {
  window.history.replaceState(null, '', path);
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: width });
  const store = configureStore({
    reducer: { modal: modalReducer },
    preloadedState: { modal: { type: 'modal-team', modalIsOpen: true, user } },
  });
  const result = render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <BrowserRouter>
          <ModalTeamContent />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
  return { ...result, store };
}

describe('ModalTeamContent', () => {
  afterEach(() => {
    delete document.documentElement.clientWidth;
    window.history.replaceState(null, '', '/');
  });

  it('renders the member details and biography', () => {
    renderTeamModal();

    expect(screen.getByRole('heading', { name: 'Maya Curator' })).toBeInTheDocument();
    expect(screen.getByText('Archaeologist')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'https://example.test/maya.jpg');
    expect(screen.getByRole('link', { name: '+123456789' })).toHaveAttribute('href', 'tel:+123456789');
    expect(screen.getByRole('link', { name: 'maya@example.test' })).toHaveAttribute('href', 'mailto:maya@example.test');
    expect(screen.getByRole('tab', { name: 'Biography' })).toHaveAttribute('aria-selected', 'true');

    const biography = screen.getByRole('tabpanel', { name: 'Biography' });
    expect(within(biography).getByText('1985')).toBeInTheDocument();
    expect(within(biography).getByText('University degree')).toBeInTheDocument();
    expect(within(biography).getByText('Museum experience')).toBeInTheDocument();
  });

  it('shows all supplied interests and publications when switching tabs', async () => {
    const user = userEvent.setup();
    renderTeamModal();

    await user.click(screen.getByRole('tab', { name: 'Interests' }));
    expect(screen.getByRole('tab', { name: 'Interests' })).toHaveAttribute('aria-selected', 'true');
    const interests = screen.getByRole('tabpanel', { name: 'Interests' });
    for (const text of [
      'Ancient pottery',
      'Research project',
      'Museum exhibition',
      'Conference participation',
      'Project participation',
      'Conservation skills',
      'Museum association',
    ]) {
      expect(within(interests).getByText(text)).toBeInTheDocument();
    }

    await user.click(screen.getByRole('tab', { name: 'Publications' }));
    expect(screen.getByRole('tab', { name: 'Publications' })).toHaveAttribute('aria-selected', 'true');
    const publications = screen.getByRole('tabpanel', { name: 'Publications' });
    expect(within(publications).getByText('catalogue', { selector: 'em' })).toBeInTheDocument();
  });

  it('omits optional sections when the member has no profile details', async () => {
    const user = userEvent.setup();
    renderTeamModal({ user: { nickname: 'maya', name: 'Maya Curator' } });

    const biography = screen.getByRole('tabpanel', { name: 'Biography' });
    expect(within(biography).queryByText(/Education and professional qualification/)).not.toBeInTheDocument();
    expect(within(biography).queryByText(/Professional Development/)).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: 'Interests' }));
    expect(within(screen.getByRole('tabpanel', { name: 'Interests' })).queryByText(/Main Interests/))
      .not.toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Publications' }));
    expect(within(screen.getByRole('tabpanel', { name: 'Publications' })).queryByText('catalogue'))
      .not.toBeInTheDocument();
  });

  it.each([
    ['desktop', 1600],
    ['mobile', 600],
  ])('closes the %s modal and removes the member nickname from the URL', async (layout, width) => {
    const user = userEvent.setup();
    const { store } = renderTeamModal({ width });

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(store.getState().modal).toEqual({ type: 'modal-team', user: member, modalIsOpen: false });
    expect(window.location.pathname).toBe('/about-us');
  });

  it('closes without changing the route when the member has no nickname', async () => {
    const user = userEvent.setup();
    const anonymousMember = { name: 'Museum Curator' };
    const { store } = renderTeamModal({ user: anonymousMember, path: '/about-us' });

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(store.getState().modal).toEqual({ type: 'modal-team', user: anonymousMember, modalIsOpen: false });
    expect(window.location.pathname).toBe('/about-us');
  });
});
