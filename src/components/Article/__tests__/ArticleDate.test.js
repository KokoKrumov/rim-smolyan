import { render, screen } from '@testing-library/react';
import ArticleDate from '../ArticleDate';

describe('ArticleDate', () => {
  it('renders the day, month and year for a single date', () => {
    render(<ArticleDate date="15.03.2024" />);

    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('март')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders a day range within the same month', () => {
    render(<ArticleDate date="10.05.2024 - 12.05.2024" />);

    expect(screen.getByText('10-12')).toBeInTheDocument();
    expect(screen.getByText('май')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it.each([
    '29.02.2024 - 02.03.2024',
    '29.02.2024-02.03.2024',
  ])('renders both dates when a range crosses months: %s', (date) => {
    render(<ArticleDate date={date} />);

    expect(screen.getByText('29')).toBeInTheDocument();
    expect(screen.getByText('февруари')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('март')).toBeInTheDocument();
    expect(screen.getAllByText('2024')).toHaveLength(2);
  });

  it('renders both years when a range crosses into a new year', () => {
    render(<ArticleDate date="31.12.2023 - 01.01.2024" />);

    expect(screen.getByText('31')).toBeInTheDocument();
    expect(screen.getByText('декември')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('януари')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });
});
