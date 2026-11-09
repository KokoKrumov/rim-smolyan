import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import WorkInfoLine from '../WorkInfoLine';

const messages = {
  'working.time': 'Opening hours',
  'working.days': 'Working days',
  'working.months.summer': 'Summer months',
  'working.months.winter': 'Winter months',
};

function renderWorkInfoLine() {
  return render(
    <IntlProvider locale="en" messages={messages}>
      <WorkInfoLine />
    </IntlProvider>
  );
}

describe('WorkInfoLine', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    ['2026-01-15', 'Winter months', 'Summer months', '09:00 - 12:00 / 13:00 - 17:00'],
    ['2026-04-30', 'Winter months', 'Summer months', '09:00 - 12:00 / 13:00 - 17:00'],
    ['2026-05-01', 'Summer months', 'Winter months', '09:00 - 18:00'],
    ['2026-09-30', 'Summer months', 'Winter months', '09:00 - 18:00'],
    ['2026-10-01', 'Winter months', 'Summer months', '09:00 - 12:00 / 13:00 - 17:00'],
    ['2026-12-31', 'Winter months', 'Summer months', '09:00 - 12:00 / 13:00 - 17:00'],
  ])('shows the correct hours and seasons on %s', (date, active, inactive, hours) => {
    const [year, month, day] = date.split('-').map(Number);
    vi.useFakeTimers();
    vi.setSystemTime(new Date(year, month - 1, day, 12));

    const { container } = renderWorkInfoLine();

    expect(screen.getByText('Opening hours')).toBeInTheDocument();
    expect(screen.getByText('Working days')).toBeInTheDocument();
    expect(screen.getByText(hours)).toBeInTheDocument();
    expect(container.querySelector('.info-line__text__get-working-time')).toHaveTextContent(active);
    expect(container.querySelector('.info-line__item__inactive-months')).toHaveTextContent(inactive);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/contact-us');
  });

  it('reveals the Monday notice when the information icon is hovered', async () => {
    renderWorkInfoLine();
    const infoIcon = screen.getAllByAltText('')[1];

    fireEvent.mouseOver(infoIcon.parentElement);

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Понеделник е санитарен ден');
  });
});
