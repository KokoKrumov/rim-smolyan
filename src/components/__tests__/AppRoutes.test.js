import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, useNavigate, useParams } from 'react-router-dom';
import AppRoutes from '../AppRoutes';

const { stub, mounted } = vi.hoisted(() => ({
  mounted: vi.fn(),
  // Each page is replaced with a stub that renders its name and the route params it received
  stub: (name) => ({
    default: function StubPage() {
      const params = useParams();
      React.useEffect(() => { mounted(name); }, []);
      return (
        <div data-testid="page" data-params={JSON.stringify(params)}>
          {name}
        </div>
      );
    },
  }),
}));

vi.mock('../pages/aboutUs/AboutUs', () => stub('AboutUs'));
vi.mock('../pages/administrative/Administrative', () => stub('Administrative'));
vi.mock('../pages/collection/CollectionsDetailItem', () => stub('CollectionsDetailItem'));
vi.mock('../pages/collection/CollectionsIndex', () => stub('CollectionsIndex'));
vi.mock('../pages/collection/CollectionsIntroAndGallery', () => stub('CollectionsIntroAndGallery'));
vi.mock('../pages/collection/CollectionsMain', () => stub('CollectionsMain'));
vi.mock('../pages/collection/CollectionsVirtual', () => stub('CollectionsVirtual'));
vi.mock('../pages/contacts/Contacts', () => stub('Contacts'));
vi.mock('../pages/ExhibitionsDetailPage/ExhibitionsDetailPage', () => stub('ExhibitionsDetailPage'));
vi.mock('../pages/exhibitions/Exhibitions', () => stub('ExhibitionsPage'));
vi.mock('../pages/fundsPage/FundsPage', () => stub('FundsPage'));
vi.mock('../pages/games/Games', () => stub('Games'));
vi.mock('../pages/homePage/HomePage', () => stub('HomePage'));
vi.mock('../pages/laszloNagyPage/LaszloNagyPage', () => stub('LaszloNagyPage'));
vi.mock('../pages/newsDetailPage/NewsDetailPage', () => stub('NewsDetailPage'));
vi.mock('../pages/newsPage/NewsPage', () => stub('NewsPage'));
vi.mock('../pages/NotFound', () => stub('NotFound'));
vi.mock('../pages/prices/Prices', () => stub('Prices'));
vi.mock('../pages/legal/LegalInfo', () => stub('LegalInfo'));
vi.mock('../pages/games/Regulation', () => stub('Regulation'));
vi.mock('../pages/services/Services', () => stub('Services'));
vi.mock('../pages/supportUs/SupportUs', () => stub('SupportUs'));
vi.mock('../pages/terms/Terms', () => stub('Terms'));

const renderAt = (path) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  );
  // Pages are lazy-loaded, so wait for Suspense to resolve
  return screen.findByTestId('page');
};

function NavigationControls({ next }) {
  const navigate = useNavigate();
  return <><Link to={next}>Next</Link><button onClick={() => navigate(-1)}>Back</button></>;
}

describe('AppRoutes', () => {
  it.each([
    ['/news/first', '/news/second'],
    ['/exhibitions/first', '/exhibitions/second'],
    ['/main-collections/intro/first', '/main-collections/intro/second'],
    ['/virtual-collections/detail/icons/first', '/virtual-collections/detail/icons/second'],
    ['/administrative/3/1', '/administrative/3/2'],
    ['/news', '/events'],
  ])('mounts fresh page state when navigating from %s to %s and back', async (first, next) => {
    mounted.mockClear();
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[first]}>
        <AppRoutes />
        <NavigationControls next={next} />
      </MemoryRouter>,
    );
    await screen.findByTestId('page');
    expect(mounted).toHaveBeenCalledOnce();
    await user.click(screen.getByRole('link', { name: 'Next' }));
    await screen.findByTestId('page');
    expect(mounted).toHaveBeenCalledTimes(2);
    await user.click(screen.getByRole('button', { name: 'Back' }));
    await screen.findByTestId('page');
    expect(mounted).toHaveBeenCalledTimes(3);
  });

  it('keeps page state when only query or hash changes', async () => {
    mounted.mockClear();
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/news/story']}>
        <AppRoutes />
        <NavigationControls next="/news/story?view=full#content" />
      </MemoryRouter>,
    );
    await screen.findByTestId('page');
    await user.click(screen.getByRole('link', { name: 'Next' }));
    expect(mounted).toHaveBeenCalledOnce();
  });

  it.each([
    ['/', 'HomePage', {}],
    ['/funds', 'FundsPage', {}],
    ['/news-and-events', 'NewsPage', {}],
    ['/news-and-events/some-article', 'NewsDetailPage', { slug: 'some-article' }],
    ['/news', 'NewsPage', {}],
    ['/news/my-article', 'NewsDetailPage', { slug: 'my-article' }],
    ['/events', 'NewsPage', {}],
    ['/events/some-event', 'NewsDetailPage', { slug: 'some-event' }],
    ['/exhibitions', 'ExhibitionsPage', {}],
    ['/exhibitions/expo-1', 'ExhibitionsDetailPage', { articleSlug: 'expo-1' }],
    ['/about-us', 'AboutUs', {}],
    ['/about-us/team', 'AboutUs', { modalContent: 'team' }],
    ['/collections', 'CollectionsIndex', {}],
    ['/main-collections', 'CollectionsMain', {}],
    ['/main-collections/intro/ethno', 'CollectionsIntroAndGallery', { type: 'ethno' }],
    ['/main-collections/detail/ethno/42', 'CollectionsDetailItem', { type: 'ethno', item: '42' }],
    ['/virtual-collections', 'CollectionsVirtual', {}],
    ['/virtual-collections/intro/icons', 'CollectionsIntroAndGallery', { type: 'icons' }],
    ['/virtual-collections/detail/icons/7', 'CollectionsDetailItem', { type: 'icons', item: '7' }],
    ['/house-museum-laszlo-nagy', 'LaszloNagyPage', {}],
    ['/contact-us', 'Contacts', {}],
    ['/support-us', 'SupportUs', {}],
    ['/privacy-policy', 'LegalInfo', {}],
    ['/terms', 'Terms', {}],
    ['/administrative', 'Administrative', {}],
    ['/administrative/3/7', 'Administrative', { parentId: '3', id: '7' }],
    ['/services', 'Services', {}],
    ['/prices', 'Prices', {}],
    ['/museum-games', 'Games', {}],
    ['/museum-games/regulation', 'Regulation', {}],
  ])('%s renders %s', async (path, page, params) => {
    const el = await renderAt(path);

    expect(el).toHaveTextContent(page);
    expect(JSON.parse(el.dataset.params)).toEqual(params);
  });

  it('decodes URL-encoded params', async () => {
    const el = await renderAt('/news/%D0%BD%D0%BE%D0%B2%D0%B8%D0%BD%D0%B0');

    expect(JSON.parse(el.dataset.params)).toEqual({ slug: 'новина' });
  });

  it.each([
    '/does-not-exist',
    '/administrative/3',
    '/main-collections/detail/ethno',
    '/virtual-collections/intro',
    '/museum-games/regulation/extra',
    '/news/a/b',
  ])('%s falls through to NotFound', async (path) => {
    expect(await renderAt(path)).toHaveTextContent('NotFound');
  });
});
