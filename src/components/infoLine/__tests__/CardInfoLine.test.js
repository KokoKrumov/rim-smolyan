import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter, useLocation } from 'react-router-dom';
import modalReducer from '../../../store/modalSlice';
import CardInfoLine from '../CardInfoLine';

function LocationProbe() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}

function card(link) {
  return (
    <Provider store={configureStore({ reducer: { modal: modalReducer } })}>
      <IntlProvider locale="en" messages={{ title: 'Title', 'see-here': 'See here' }}>
        <CardInfoLine title="title" link={link} />
      </IntlProvider>
    </Provider>
  );
}

it('routes internal card destinations without reloading the document', async () => {
  const user = userEvent.setup();
  render(<MemoryRouter>{card('/prices')}<LocationProbe /></MemoryRouter>);
  await user.click(screen.getByRole('link', { name: 'See here' }));
  expect(screen.getByTestId('location')).toHaveTextContent('/prices');
});

it('keeps document-download links as native external anchors', () => {
  render(card('https://static.museumsmolyan.eu/docs/example.doc'));
  expect(screen.getByRole('link', { name: 'See here' }))
    .toHaveAttribute('href', 'https://static.museumsmolyan.eu/docs/example.doc');
});
