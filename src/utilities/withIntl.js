import React from 'react';
import { useIntl } from 'react-intl';

/**
 * Compatibility HOC replacing the removed `injectIntl` from react-intl v10.
 * Injects the `intl` object as a prop into class (or any) components.
 */
export function withIntl(WrappedComponent) {
  function WithIntl(props) {
    const intl = useIntl();
    return React.createElement(WrappedComponent, { ...props, intl });
  }
  WithIntl.displayName = `WithIntl(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithIntl;
}
