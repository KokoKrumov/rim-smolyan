import { render, screen, within } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import PostSummaryList from '../PostSummaryList';

const news = {
  slug: 'museum-news',
  title: { rendered: 'Museum <em>news</em>' },
  excerpt: { rendered: '<p>Latest discoveries</p>' },
  date_gmt: '2024-03-15T12:00:00',
  _embedded: {},
};

const event = {
  slug: 'spring-event',
  title: { rendered: 'Spring event' },
  excerpt: { rendered: '' },
  date_gmt: '2024-03-01T12:00:00',
  event_date: '15.03.2024 - 17.03.2024',
  event_place: 'Museum hall',
  _embedded: { 'wp:featuredmedia': [{ source_url: 'https://example.test/event.jpg' }] },
};

function renderList(props = {}) {
  return render(
    <IntlProvider locale="en" messages={{ 'see-more': 'Read more' }}>
      <PostSummaryList {...props} />
    </IntlProvider>
  );
}

describe('PostSummaryList', () => {
  it('shows a loading indicator for a missing list and an empty list for no entries', () => {
    const { rerender, container } = renderList();
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(
      <IntlProvider locale="en" messages={{ 'see-more': 'Read more' }}>
        <PostSummaryList listOfNewsAndEvents={[]} />
      </IntlProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a news item with its publication date, excerpt and links', () => {
    renderList({ listOfNewsAndEvents: [news] });

    const heading = screen.getByRole('heading', { name: 'Museum news' });
    expect(within(heading).getByText('news', { selector: 'em' })).toBeInTheDocument();
    expect(within(heading).getByRole('link')).toHaveAttribute('href', '/news-and-events/museum-news');
    expect(screen.getByText('15 март 2024')).toBeInTheDocument();
    expect(screen.getByText('Latest discoveries')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute('href', '/news-and-events/museum-news');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders an event date and its featured image instead of the publication date', () => {
    renderList({ listOfNewsAndEvents: [event] });

    expect(screen.getByText('15-17')).toBeInTheDocument();
    expect(screen.getByText('март')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.queryByText('1 март 2024')).not.toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', 'https://example.test/event.jpg');
    expect(screen.getByRole('link', { name: 'Spring event' })).toHaveAttribute('href', '/news-and-events/spring-event');
  });

  it('uses exhibition links and displays the exhibition date and venue together', () => {
    renderList({ listOfNewsAndEvents: [event], isExhibition: true });

    expect(screen.getByRole('link', { name: 'Spring event' })).toHaveAttribute('href', '/exhibitions/spring-event');
    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute('href', '/exhibitions/spring-event');
    expect(screen.getByText('Museum hall')).toBeInTheDocument();
    expect(screen.getByText(/15 март 2024\s*-\s*17 март 2024/)).toBeInTheDocument();
  });

  it('omits the exhibition date and venue when the venue is missing', () => {
    renderList({ listOfNewsAndEvents: [{ ...event, event_place: '' }], isExhibition: true });

    expect(screen.queryByText('Museum hall')).not.toBeInTheDocument();
    expect(screen.queryByText(/15 март 2024/)).not.toBeInTheDocument();
  });
});
