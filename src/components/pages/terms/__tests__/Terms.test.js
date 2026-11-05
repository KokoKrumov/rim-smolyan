import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import modalReducer from '../../../../store/modalSlice';
import Terms from '../Terms';

describe('Terms', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the terms and returns to the previous page', async () => {
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {});
    const store = configureStore({ reducer: { modal: modalReducer } });
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <IntlProvider locale="en" messages={{ back: 'Back' }}>
          <Terms />
        </IntlProvider>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /ОБЩИ УСЛОВИЯ/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '1. Понятия' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '9. Кореспонденция' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(back).toHaveBeenCalledOnce();
  });
});
