import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation } from 'react-router-dom';
import modalReducer from '../../../store/modalSlice';
import messages from '../../../translations/en.json';
import Footer from '../Footer';

function LocationProbe() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}

it('navigates footer destinations within the router and keeps social links external', async () => {
  const store = configureStore({ reducer: { modal: modalReducer } });
  const user = userEvent.setup();
  const { container } = render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={messages}>
        <MemoryRouter>
          <Footer />
          <LocationProbe />
        </MemoryRouter>
      </IntlProvider>
    </Provider>,
  );
  const contacts = container.querySelector('a[href="/contact-us"]');
  await user.click(contacts);
  expect(screen.getByTestId('location')).toHaveTextContent('/contact-us');
  expect(container.querySelector('a[href="https://www.facebook.com/museum.smolyan"]'))
    .toHaveAttribute('target', '_blank');
});
