import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

/**
 * Compatibility HOC replacing the removed `withRouter` from react-router-dom v6+.
 * Injects `navigate`, `location`, and `match` (with `params`) as props into class components.
 */
export function withRouter(WrappedComponent) {
  function WithRouter(props) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    return React.createElement(WrappedComponent, {
      ...props,
      navigate,
      match: { params },
      location,
    });
  }
  WithRouter.displayName = `WithRouter(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return WithRouter;
}
