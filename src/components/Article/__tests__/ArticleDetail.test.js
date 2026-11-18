import { render, screen, within } from '@testing-library/react';
import ArticleDetail from '../ArticleDetail';

const article = {
  title: { rendered: 'Museum news' },
  content: { rendered: '<p>Story content</p>' },
  _embedded: {
    'wp:term': [[{ slug: 'news-and-events' }, { slug: 'news' }]],
    'wp:featuredmedia': [{
      source_url: '/full.jpg',
      media_details: {
        width: 1200, height: 800,
        sizes: { medium_large: { source_url: '/medium.jpg', width: 600, height: 400 } },
      },
    }],
  },
};

it('prioritizes the main article image and reserves its aspect ratio', () => {
  render(<ArticleDetail article={article} />);
  const image = within(screen.getByRole('figure')).getByAltText('');
  expect(image).toHaveAttribute('fetchpriority', 'high');
  expect(image).toHaveAttribute('loading', 'eager');
  expect(image).toHaveAttribute('decoding', 'async');
  expect(image).toHaveAttribute('srcset', '/medium.jpg 600w, /full.jpg 1200w');
  expect(image).toHaveAttribute('width', '1200');
  expect(image).toHaveAttribute('height', '800');
});
