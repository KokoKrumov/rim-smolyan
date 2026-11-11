import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import modalReducer from '../../store/modalSlice';
import messages from '../../translations/en.json';
import CardTeamHeadmaster from '../cards/cardTeamHeadmaster';
import SupportUs from '../pages/supportUs/SupportUs';

afterEach(() => vi.restoreAllMocks());

it.each([
  ['director card', <CardTeamHeadmaster user={{ name: 'Director', role: 'Director', nickname: 'director' }} />],
  ['support page', <SupportUs />],
])('removes the same resize listener that the %s registered', (_name, component) => {
  const add = vi.spyOn(window, 'addEventListener');
  const remove = vi.spyOn(window, 'removeEventListener');
  const { unmount } = render(
    <Provider store={configureStore({ reducer: { modal: modalReducer } })}>
      <IntlProvider locale="en" messages={messages}>
        <MemoryRouter>{component}</MemoryRouter>
      </IntlProvider>
    </Provider>,
  );
  const resizeCalls = add.mock.calls.filter(([event]) => event === 'resize');
  expect(resizeCalls).toHaveLength(1);
  unmount();
  expect(remove).toHaveBeenCalledWith('resize', resizeCalls[0][1]);
});
