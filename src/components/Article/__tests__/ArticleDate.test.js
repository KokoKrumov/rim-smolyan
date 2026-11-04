import { render, screen } from '@testing-library/react';
import ArticleDate from '../ArticleDate';

describe('ArticleDate', () => {
  it('renders a single date', () => {
    render(<ArticleDate date="15.03.2024" />);
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders a day range within the same month', () => {
    render(<ArticleDate date="10.05.2024 - 12.05.2024" />);
    expect(screen.getByText('10-12')).toBeInTheDocument();
  });
});
