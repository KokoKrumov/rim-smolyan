import React from 'react';
import { useIntl as useReactIntl } from 'react-intl';

/**
 * Wraps react-intl's useIntl and defaults ignoreTag to true so that messages
 * containing raw HTML (e.g. <p class="...">) are treated as literal text
 * rather than ICU rich-text elements.
 */
export function useIntl() {
  const intl = useReactIntl();
  return {
    ...intl,
    formatMessage: (descriptor, values, opts) =>
      intl.formatMessage(descriptor, values, { ignoreTag: true, ...opts }),
  };
}

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
