import { configureStore } from '@reduxjs/toolkit';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import modalReducer from '../../../store/modalSlice';
import AccordionBlock from '../AccordionBlock';

const makeBlock = (hash, content, extra = {}) => ({
  id: hash,
  hash,
  title: `${hash} title`,
  type: 'collapsable',
  content,
  ...extra,
});

function renderAccordion(blocks, openId = blocks[0].id, onToggle = vi.fn()) {
  const store = configureStore({ reducer: { modal: modalReducer } });
  const renderWithOpenId = (id) => (
    <Provider store={store}>
      <IntlProvider locale="en" messages={{ 'see-more': 'See more' }}>
        <AccordionBlock
          content={blocks}
          openAccordionItemPured={id}
          handleInitialHash={onToggle}
        />
      </IntlProvider>
    </Provider>
  );
  const result = render(renderWithOpenId(openId));
  return {
    ...result,
    onToggle,
    setOpenId: (id) => result.rerender(renderWithOpenId(id)),
  };
}

describe('AccordionBlock', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('notifies its parent when a section is toggled and reflects the controlled open item', async () => {
    const block = makeBlock('friends', [{ title: 'Museum friend', url: 'https://friend.example' }]);
    const user = userEvent.setup();
    const { container, onToggle, setOpenId } = renderAccordion([block]);

    expect(container.querySelector('#friends')).toHaveClass('accordion__wrap__active');
    expect(container.querySelector('.accordion-collapse')).toHaveClass('show');

    await user.click(screen.getByRole('heading', { name: 'friends title' }));
    expect(onToggle).toHaveBeenCalledOnce();
    expect(onToggle).toHaveBeenCalledWith(block);

    setOpenId(null);
    expect(container.querySelector('#friends')).not.toHaveClass('accordion__wrap__active');
    expect(container.querySelector('.accordion-collapse')).not.toHaveClass('show');
  });

  it.each(['friends', 'links'])('renders %s as external links', (hash) => {
    const block = makeBlock(hash, [{ title: 'Partner museum', url: 'https://partner.example' }]);
    renderAccordion([block]);

    const link = screen.getByRole('link', { name: 'Partner museum' });
    expect(link).toHaveAttribute('href', 'https://partner.example');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener nofollow noreferrer');
  });

  it.each(['statute', 'docs'])('renders the %s HTML content', (hash) => {
    renderAccordion([makeBlock(hash, '<strong>Important document</strong>')]);

    expect(screen.getByText('Important document', { selector: 'strong' })).toBeInTheDocument();
  });

  it('renders donor years and numbered donors', () => {
    renderAccordion([
      makeBlock('donors', [{ year: '2025', donors: [{ number: 1, name: 'Ada' }, { number: 2, name: 'Emil' }] }]),
    ]);

    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('1. Ada')).toBeInTheDocument();
    expect(screen.getByText('2. Emil')).toBeInTheDocument();
  });

  it('renders media logos as links', () => {
    renderAccordion([
      makeBlock('media', [{ name: 'Radio Museum', logo: '/radio.png', url: 'https://radio.example' }]),
    ]);

    const logo = screen.getByRole('img', { name: 'Radio Museum' });
    expect(logo).toHaveAttribute('src', '/radio.png');
    expect(logo.closest('a')).toHaveAttribute('href', 'https://radio.example');
  });

  it('links projects and partner projects to their administrative details', () => {
    const projects = makeBlock('projects', [{ id: 7, content: 'Museum <em>project</em>' }], { id: '10' });
    const partners = makeBlock('partnersProjects', [{ id: 8, content: 'Partner project' }], { id: '11' });
    const { setOpenId } = renderAccordion([projects, partners], '10');

    expect(screen.getByRole('link', { name: 'Museum project' })).toHaveAttribute('href', '/administrative/10/7');

    setOpenId('11');
    const section = screen.getByRole('heading', { name: 'partnersProjects title' }).closest('.accordion__wrap');
    expect(within(section).getByText('Partner project')).toBeInTheDocument();
    expect(within(section).getByRole('link', { name: 'See more' })).toHaveAttribute('href', '/administrative/11/8');
  });

  it('renders report download links and ignores unknown content types', () => {
    const reports = makeBlock('reports', [{ year: '2024', url: '/report.pdf' }]);
    const unknown = makeBlock('unknown', 'not displayed');
    renderAccordion([reports, unknown]);

    const link = screen.getByRole('link', { name: '2024' });
    expect(link).toHaveAttribute('href', '/report.pdf');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByText('not displayed')).not.toBeInTheDocument();
  });

  it('opens a document when a non-collapsible item is selected', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const user = userEvent.setup();
    const { onToggle } = renderAccordion([
      makeBlock('download', null, { type: 'download', url: '/document.pdf' }),
    ]);

    await user.click(screen.getByRole('heading', { name: 'download title' }));

    expect(open).toHaveBeenCalledExactlyOnceWith('/document.pdf');
    expect(onToggle).not.toHaveBeenCalled();
  });
});
