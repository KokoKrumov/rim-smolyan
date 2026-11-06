import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import modalReducer from '../../../../store/modalSlice';
import LegalInfo from '../LegalInfo';

describe('LegalInfo', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the privacy policy and returns to the previous page', async () => {
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {});
    const store = configureStore({ reducer: { modal: modalReducer } });
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{ back: 'Back' }}>
          <LegalInfo />
        </IntlProvider>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'I. ПОНЯТИЯ:' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /X. КОМПЕТЕНТНИ ОРГАНИ/ })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'https://museumsmolyan.eu' }).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(back).toHaveBeenCalledOnce();
  });
});
