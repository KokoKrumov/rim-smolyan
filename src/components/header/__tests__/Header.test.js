import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import modalReducer from '../../../store/modalSlice';
import Header from '../Header';

const messages = {
  headline: 'Museum',
  'menu.search': 'Search',
  'menu.search-in': 'Search in',
  'menu.support': 'Support us',
  'menu.administrative': 'Administration',
  'menu.collections': 'Collections',
  'menu.main-collections': 'Main collections',
  'menu.virtual-collections': 'Virtual collections',
  'menu.exhibitions': 'Exhibitions',
  'menu.news': 'News and events',
  'menu.about-us': 'About us',
  'menu.about-museum': 'About the museum',
  games: 'Games',
  services: 'Services',
  prices: 'Prices',
  'menu.contact-us': 'Contact',
  'menu.house-museum': 'House museum',
};

function setWidth(width) {
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: width });
}

function renderHeader(path = '/') {
  const store = configureStore({ reducer: { modal: modalReducer } });
  return render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <MemoryRouter initialEntries={[path]}>
          <Header />
        </MemoryRouter>
      </IntlProvider>
    </Provider>
  );
}

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
    setWidth(1600);
  });

  afterEach(() => {
    localStorage.clear();
    delete document.documentElement.clientWidth;
  });

  it('renders the home link, search and collection destinations', async () => {
    const user = userEvent.setup();
    renderHeader();

    expect(screen.getByRole('link', { name: 'Museum' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveAttribute('placeholder', 'Search');

    await user.click(screen.getByRole('button', { name: 'Collections' }));
    expect(screen.getByRole('link', { name: 'Main collections' })).toHaveAttribute('href', '/main-collections');
    expect(screen.getByRole('link', { name: 'Virtual collections' })).toHaveAttribute('href', '/virtual-collections');
  });

  it.each([
    ['/support-us', 'Support us'],
    ['/administrative/3/7', 'Administration'],
    ['/exhibitions/example', 'Exhibitions'],
    ['/news', 'News and events'],
    ['/events', 'News and events'],
    ['/contact-us', 'Contact'],
    ['/house-museum-laszlo-nagy', 'House museum'],
  ])('marks %s as the active navigation destination', (path, label) => {
    renderHeader(path);

    expect(screen.getByRole('link', { name: label })).toHaveClass('active');
  });

  it('marks the about-us menu and matching submenu item for the current route', async () => {
    const user = userEvent.setup();
    const { container } = renderHeader('/prices');
    const aboutMenu = screen.getByRole('button', { name: 'About us' });

    expect(aboutMenu.closest('.nav__main-link')).toHaveClass('active');
    await user.click(aboutMenu);
    expect(screen.getByRole('link', { name: 'Prices' })).toHaveClass('active');
    expect(container.querySelector('.header-navigation__inner__child__mobile')).not.toBeInTheDocument();
  });

  it('opens and closes the mobile navigation', async () => {
    setWidth(600);
    const user = userEvent.setup();
    const { container } = renderHeader();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
    const hamburger = container.querySelector('.hamburger');

    expect(hamburger).not.toHaveClass('is-active');
    await user.click(toggle);
    expect(hamburger).toHaveClass('is-active');
    await user.click(toggle);
    expect(hamburger).not.toHaveClass('is-active');
  });

  it('moves the language controls on resize and shows the saved language', async () => {
    localStorage.setItem('lang', 'en');
    const user = userEvent.setup();
    const { container } = renderHeader();
    let dropdown = container.querySelector('.dropdown-lang');

    expect(dropdown).toHaveTextContent('EN');
    expect(dropdown.closest('.header-navigation__inner__child__mobile')).toBeNull();

    setWidth(600);
    fireEvent.resize(window);

    dropdown = container.querySelector('.dropdown-lang');
    expect(dropdown.closest('.header-navigation__inner__child__mobile')).toBeInTheDocument();
    await user.click(within(dropdown).getByRole('button', { name: 'EN' }));
    const menu = dropdown.querySelector('.dropdown-menu');
    expect(within(menu).getByRole('button', { name: 'EN' })).toHaveClass('active');
    expect(within(menu).getByRole('button', { name: 'BG' })).not.toHaveClass('active');
  });
});
