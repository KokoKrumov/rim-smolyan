import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import CardCollections from '../cardCollections';

vi.mock('react-intl', () => ({
  useIntl: () => ({ formatMessage: ({ id }) => id }),
}));

function card(item, collectionsType) {
  return (
    <MemoryRouter>
      <CardCollections item={item} collectionsType={collectionsType} />
    </MemoryRouter>
  );
}

describe('CardCollections image sizing', () => {
  it.each([
    ['main', 330, 421],
    ['virtual', 240, 137],
  ])('reserves the correct %s preview size on the initial render', (type, width, height) => {
    const src = `https://static.museumsmolyan.eu/collections/images/${type}/weapon.png`;
    const element = card({
      name: 'Weapons',
      slug: 'weapons',
      description: JSON.stringify({ image: src }),
    }, type);
    const initialMarkup = document.createElement('div');
    initialMarkup.innerHTML = renderToStaticMarkup(element);
    const initialImage = initialMarkup.querySelector('img');

    expect(initialImage).toHaveAttribute('src', src);
    expect(initialImage).toHaveAttribute('width', String(width));
    expect(initialImage).toHaveAttribute('height', String(height));

    render(element);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/${type}-collections/intro/weapons`);
  });

  it('reserves space for the fallback image when a category has no preview', () => {
    render(card({ name: 'Empty', slug: 'empty', description: '' }, 'main'));

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', expect.stringContaining('/no-image.png'));
    expect(image).toHaveAttribute('width', '1920');
    expect(image).toHaveAttribute('height', '1080');
  });

  it('preserves featured media dimensions and responsive sources for gallery cards', () => {
    render(card({
      slug: 'vase',
      title: { rendered: 'Vase' },
      _embedded: {
        'wp:featuredmedia': [{
          source_url: 'https://example.test/vase.jpg',
          title: 'Vase',
          media_details: { width: 1200, height: 800 },
        }],
      },
    }, 'main'));

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('width', '1200');
    expect(image).toHaveAttribute('height', '800');
    expect(image).toHaveAttribute('srcset', 'https://example.test/vase.jpg 1200w');
  });

  it('does not assign an unrelated size to an unknown preview URL', () => {
    render(card({
      name: 'New collection',
      slug: 'new',
      description: JSON.stringify({ image: 'https://example.test/weapon.png' }),
    }, 'virtual'));

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.test/weapon.png');
    expect(image).not.toHaveAttribute('width');
    expect(image).not.toHaveAttribute('height');
  });
});
