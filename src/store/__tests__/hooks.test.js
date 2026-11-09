import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks';
import modalReducer, { modalActions } from '../modalSlice';

const member = { id: 1, name: 'Test member' };

function ModalControls() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  return (
    <>
      <p role="status">{modal.modalIsOpen ? `Open for ${modal.user.name}` : 'Closed'}</p>
      <button onClick={() => dispatch(modalActions.showTeam({ data: 'modal-team', user: member }))}>
        Open
      </button>
      <button
        onClick={() =>
          dispatch((innerDispatch) => innerDispatch(modalActions.closeTeam({ data: 'modal-team' })))
        }
      >
        Close
      </button>
    </>
  );
}

describe('Redux hooks', () => {
  it('selects updated state and dispatches both actions and thunks', async () => {
    const user = userEvent.setup();
    const store = configureStore({ reducer: { modal: modalReducer } });

    render(
      <Provider store={store}>
        <ModalControls />
      </Provider>
    );

    expect(screen.getByRole('status')).toHaveTextContent('Closed');

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(screen.getByRole('status')).toHaveTextContent('Open for Test member');
    expect(store.getState().modal).toEqual({
      type: 'modal-team',
      user: member,
      modalIsOpen: true,
    });

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.getByRole('status')).toHaveTextContent('Closed');
    expect(store.getState().modal).toEqual({
      type: 'modal-team',
      user: member,
      modalIsOpen: false,
    });
  });
});
