import { render, screen, within } from '@testing-library/react';
import NewsAndEventsCards from '../NewsAndEventsCards';

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

describe('NewsAndEventsCards', () => {
  it.each([undefined, null])('shows a loading spinner when the list is %s', (listOfNewsAndEvents) => {
    render(<NewsAndEventsCards listOfNewsAndEvents={listOfNewsAndEvents} />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('spinner', 'spinner-border');
    expect(spinner.parentElement).toHaveClass('spinner-wrap');
    expect(within(spinner).getByText('Loading ...')).toHaveClass('visually-hidden');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders an empty list without a loading spinner', () => {
    const { container } = render(<NewsAndEventsCards listOfNewsAndEvents={[]} />);

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('replaces the spinner when articles arrive', () => {
    const { rerender } = render(<NewsAndEventsCards />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(<NewsAndEventsCards listOfNewsAndEvents={[newsItem]} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Museum news' })).toBeInTheDocument();
  });

  it('renders article titles and links for every entry', () => {
    render(<NewsAndEventsCards listOfNewsAndEvents={[newsItem, eventItem]} />);

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
    render(<NewsAndEventsCards listOfNewsAndEvents={[eventItem]} />);

    const eventLink = screen.getByRole('link', { name: /Spring event/ });

    expect(within(eventLink).getByText('15-17')).toBeInTheDocument();
    expect(within(eventLink).getByText('март')).toBeInTheDocument();
    expect(within(eventLink).getByText('2024')).toBeInTheDocument();
    expect(within(eventLink).getByAltText('')).toHaveAttribute('src', 'https://example.test/event.jpg');
  });

  it('omits the date and image when optional event data is absent', () => {
    render(<NewsAndEventsCards listOfNewsAndEvents={[newsItem]} />);

    const newsLink = screen.getByRole('link', { name: 'Museum news' });

    expect(newsLink).toHaveTextContent(/^Museum news$/);
    expect(within(newsLink).queryByAltText('')).not.toBeInTheDocument();
  });

  it('renders a link even when the title is absent', () => {
    render(<NewsAndEventsCards listOfNewsAndEvents={[{ id: 3, slug: 'untitled' }]} />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/news-and-events/untitled');
    expect(screen.getByRole('heading')).toBeEmptyDOMElement();
  });
});
