import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation } from 'react-router-dom';
import modalReducer from '../../../store/modalSlice';
import CardTeamMember from '../cardTeamMember';

vi.mock('react-intl', () => ({
  useIntl: () => ({ formatMessage: ({ id }) => id }),
  FormattedMessage: ({ id }) => id,
}));

const member = {
  name: 'Alex Example',
  nickname: 'alex-example',
  role: 'Curator',
  avatar: 'https://example.test/avatar.jpg',
};

function CurrentLocation() {
  const { pathname } = useLocation();
  return <p data-testid="location">{pathname}</p>;
}

function renderCard(user = member) {
  const store = configureStore({ reducer: { modal: modalReducer } });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/about-us']}>
        <CardTeamMember user={user} />
        <CurrentLocation />
      </MemoryRouter>
    </Provider>
  );

  return store;
}

describe('CardTeamMember', () => {
  it('renders member details and a profile link', () => {
    renderCard();

    expect(screen.getByRole('heading', { name: 'Alex Example' })).toBeInTheDocument();
    expect(screen.getByText('Curator')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'https://example.test/avatar.jpg');
    expect(screen.getByRole('link', { name: 'see-more' })).toHaveAttribute('href', '/about-us/alex-example');
  });

  it('renders contact links when they are provided', () => {
    renderCard({
      ...member,
      email: '<a href="mailto:alex@example.test">alex@example.test</a>',
      phone: '<a href="tel:+123456789">+123456789</a>',
    });

    expect(screen.getByRole('link', { name: 'alex@example.test' }))
      .toHaveAttribute('href', 'mailto:alex@example.test');
    expect(screen.getByRole('link', { name: '+123456789' }))
      .toHaveAttribute('href', 'tel:+123456789');
  });

  it('omits contact details when they are absent', () => {
    renderCard();

    expect(screen.queryByText('email-address')).not.toBeInTheDocument();
    expect(screen.queryByText('phone-address')).not.toBeInTheDocument();
  });

  it('opens the team modal and navigates to the selected member', async () => {
    const user = userEvent.setup();
    const store = renderCard();

    expect(store.getState().modal).toEqual({});
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/about-us$/);

    await user.click(screen.getByRole('link', { name: 'see-more' }));

    expect(store.getState().modal).toEqual({
      type: 'modal-team',
      user: member,
      modalIsOpen: true,
    });
    expect(screen.getByTestId('location')).toHaveTextContent(/^\/about-us\/alex-example$/);
  });
});
