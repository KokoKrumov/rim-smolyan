import { render as renderWithoutRouter, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewsAndEventsList from '../NewsAndEventsList';

const render = ui => renderWithoutRouter(ui, { wrapper: MemoryRouter });

const newsItem = {
  id: 1,
  slug: 'museum-news',
  title: { rendered: 'Museum <em>news</em>' },
};

const eventItem = {
  id: 2,
  slug: 'spring-event',
  title: { rendered: 'Spring event' },
  event_date: '15.03.2024 - 17.03.2024',
  _embedded: {
    'wp:featuredmedia': [
      { source_url: 'https://example.test/event.jpg' },
      { source_url: 'https://example.test/other.jpg' },
    ],
  },
};

describe('NewsAndEventsList', () => {
  it('shows loading when articles have not been provided', () => {
    render(<NewsAndEventsList />);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders an empty list without a loading message', () => {
    const { container } = render(<NewsAndEventsList listOfNewsAndEvents={[]} />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText('Loading ...')).not.toBeInTheDocument();
  });

  it('renders article titles and links for every entry', () => {
    render(<NewsAndEventsList listOfNewsAndEvents={[newsItem, eventItem]} />);

    const newsLink = screen.getByRole('link', { name: 'Museum news' });
    const eventLink = screen.getByRole('link', { name: /Spring event/ });

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(newsLink).toHaveAttribute('href', '/news-and-events/museum-news');
    expect(eventLink).toHaveAttribute('href', '/news-and-events/spring-event');
    expect(within(newsLink).getByRole('heading', { name: 'Museum news' })).toBeInTheDocument();
    expect(within(newsLink).getByText('news', { selector: 'em' })).toBeInTheDocument();
    expect(within(eventLink).getByRole('heading', { name: 'Spring event' })).toBeInTheDocument();
  });

  it('renders an event date and its first featured image', () => {
    render(<NewsAndEventsList listOfNewsAndEvents={[eventItem]} />);

    const eventLink = screen.getByRole('link', { name: /Spring event/ });

    expect(within(eventLink).getByText('15-17')).toBeInTheDocument();
    expect(within(eventLink).getByText('март')).toBeInTheDocument();
    expect(within(eventLink).getByText('2024')).toBeInTheDocument();
    expect(within(eventLink).getByAltText('')).toHaveAttribute('src', 'https://example.test/event.jpg');
    expect(within(eventLink).getByAltText('')).toHaveAttribute('loading', 'lazy');
    expect(within(eventLink).getByAltText('')).toHaveAttribute('decoding', 'async');
  });

  it('omits the date and image when optional event data is absent', () => {
    render(<NewsAndEventsList listOfNewsAndEvents={[newsItem]} />);

    const newsLink = screen.getByRole('link', { name: 'Museum news' });

    expect(newsLink).toHaveTextContent(/^Museum news$/);
    expect(within(newsLink).queryByAltText('')).not.toBeInTheDocument();
  });

  it('renders a link even when the title is absent', () => {
    render(<NewsAndEventsList listOfNewsAndEvents={[{ id: 3, slug: 'untitled' }]} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/news-and-events/untitled');
    expect(screen.getByRole('heading')).toBeEmptyDOMElement();
  });
});
