import modalReducer from './ModalReducer';
import { FETCH_TEAM_MODAL, CLOSE_TEAM_MODAL } from '../actions/types';

describe('ModalReducer', () => {
  it('returns the initial state for unknown actions', () => {
    expect(modalReducer(undefined, { type: '@@INIT' })).toEqual({});
  });

  it('opens and closes the team modal', () => {
    const user = { name: 'Test' };
    const opened = modalReducer({}, { type: FETCH_TEAM_MODAL, data: 'team', user });
    expect(opened).toEqual({ type: 'team', user, modalIsOpen: true });

    const closed = modalReducer(opened, { type: CLOSE_TEAM_MODAL, data: 'team' });
    expect(closed.modalIsOpen).toBe(false);
  });
});
