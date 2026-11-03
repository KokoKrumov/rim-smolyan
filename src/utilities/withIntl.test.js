import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { useIntl, withIntl } from './withIntl';

const messages = {
  greeting: 'Здравейте, {name}!',
  rich: '<p class="lead">Добре дошли</p>',
};

const wrapper = ({ children }) => (
  <IntlProvider locale="bg" messages={messages} onError={() => {}}>
    {children}
  </IntlProvider>
);

describe('useIntl', () => {
  it('formats messages with values', () => {
    const { result } = renderHook(() => useIntl(), { wrapper });

    expect(result.current.formatMessage({ id: 'greeting' }, { name: 'Иван' })).toBe('Здравейте, Иван!');
  });

  it('returns messages containing HTML as literal text', () => {
    const { result } = renderHook(() => useIntl(), { wrapper });

    expect(result.current.formatMessage({ id: 'rich' })).toBe('<p class="lead">Добре дошли</p>');
  });

  it('keeps the rest of the intl API', () => {
    const { result } = renderHook(() => useIntl(), { wrapper });

    expect(result.current.locale).toBe('bg');
    expect(result.current.messages).toBe(messages);
    expect(typeof result.current.formatDate).toBe('function');
  });
});

describe('withIntl', () => {
  class Greeting extends React.Component {
    render() {
      const { intl, name } = this.props;
      return <span>{intl.formatMessage({ id: 'greeting' }, { name })}</span>;
    }
  }

  it('injects intl into class components and forwards props', () => {
    const Wrapped = withIntl(Greeting);
    render(<Wrapped name="Мария" />, { wrapper });

    expect(screen.getByText('Здравейте, Мария!')).toBeInTheDocument();
  });

  it('sets a descriptive displayName', () => {
    expect(withIntl(Greeting).displayName).toBe('WithIntl(Greeting)');

    const Named = () => null;
    Named.displayName = 'CustomName';
    expect(withIntl(Named).displayName).toBe('WithIntl(CustomName)');

    expect(withIntl(() => null).displayName).toBe('WithIntl(Component)');
  });
});
