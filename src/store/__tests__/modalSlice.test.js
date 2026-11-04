import modalReducer, { modalActions } from '../modalSlice';

describe('modalSlice', () => {
  it('returns the initial state for unknown actions', () => {
    expect(modalReducer(undefined, { type: '@@INIT' })).toEqual({});
  });

  it('opens and closes the team modal', () => {
    const user = { name: 'Test' };
    const opened = modalReducer({}, modalActions.showTeam({ data: 'team', user }));
    expect(opened).toEqual({ type: 'team', user, modalIsOpen: true });

    const closed = modalReducer(opened, modalActions.closeTeam({ data: 'team' }));
    expect(closed.modalIsOpen).toBe(false);
  });

  it('opens the redirect modal with a url', () => {
    const state = modalReducer({}, modalActions.showRedirect({ data: 'redirect', url: 'https://example.com' }));
    expect(state).toEqual({ type: 'redirect', url: 'https://example.com', modalIsOpen: true });
  });
});
