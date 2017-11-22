import React from 'react';
import PropTypes from 'prop-types';

export default function withSession(names) {
  const session = context => names.reduce((res, name) => ({
    ...res,
    [name]: (...args) => context.sessionExecute(name, args),
  }), {});

  return (Component) => {
    const SessionComponent = (props, context) => (
      <Component {...props} session={session(context)} />
    );

    SessionComponent.contextTypes = {
      sessionExecute: PropTypes.func.isRequired,
    };

    return SessionComponent;
  };
}
