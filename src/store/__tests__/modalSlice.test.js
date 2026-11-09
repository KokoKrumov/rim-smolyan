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
    expect(closed).toEqual({ type: 'team', user, modalIsOpen: false });
  });

  it('opens and closes the redirect modal with the supplied url', () => {
    const opened = modalReducer(
      { retained: true },
      modalActions.showRedirect({ data: 'redirect', url: 'https://example.com' })
    );
    expect(opened).toEqual({
      retained: true,
      type: 'redirect',
      url: 'https://example.com',
      modalIsOpen: true,
    });

    const closed = modalReducer(
      opened,
      modalActions.closeRedirect({ data: 'redirect', url: 'https://example.com/next' })
    );
    expect(closed).toEqual({
      retained: true,
      type: 'redirect',
      url: 'https://example.com/next',
      modalIsOpen: false,
    });
  });

  it('opens and closes the Shishkov modal without dropping existing state', () => {
    const opened = modalReducer({ retained: true }, modalActions.showNedelov({ data: 'modal-shishkov' }));
    expect(opened).toEqual({ retained: true, type: 'modal-shishkov', modalIsOpen: true });

    const closed = modalReducer(opened, modalActions.closeNedelov({ data: 'modal-shishkov' }));
    expect(closed).toEqual({ retained: true, type: 'modal-shishkov', modalIsOpen: false });
  });
});
