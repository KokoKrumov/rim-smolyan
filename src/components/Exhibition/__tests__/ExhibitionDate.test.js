import { render } from '@testing-library/react';
import ExhibitionDate from '../ExhibitionDate';

describe('ExhibitionDate', () => {
  it('renders a range within one month', () => {
    const { container } = render(<ExhibitionDate date="05.03.2024-12.03.2024" />);

    expect(container).toHaveTextContent('5 март 2024 - 12 март 2024');
  });

  it('renders a range across months in the same year', () => {
    const { container } = render(<ExhibitionDate date="30.04.2024 - 02.05.2024" />);

    expect(container).toHaveTextContent('30 април 2024 - 2 май 2024');
  });

  it('renders both days and months for a range across years', () => {
    const { container } = render(<ExhibitionDate date="31.12.2023 - 01.01.2024" />);

    expect(container).toHaveTextContent(/31 декември.*1 януари/);
  });
});
