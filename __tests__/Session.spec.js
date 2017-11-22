import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import { Session } from '../src';

describe('Session Component', () => {
  const createChild = () => {
    const Child = (props, context) => <div context={context} />;
    Child.contextTypes = {
      sessionExecute: PropTypes.func.isRequired,
    };

    return Child;
  };

  const mockClient = {
    execute: jest.fn(),
    close: jest.fn(),
  };

  const mockConnector = () => mockClient;

  const Child = createChild();

  it('should enforce a single child', () => {
    const old = Session.propTypes;
    Session.propTypes = {};

    renderer.create(<Session connector={mockConnector}><div /></Session>);
    try {
      expect(() => renderer.create(<Session connector={mockConnector} />)).toThrow(/a single React element child/);
      expect(() => renderer.create(<Session connector={mockConnector}><div /><div /></Session>)).toThrow(/a single React element child/);
    } finally {
      Session.propTypes = old;
    }
  });

  it('should add the session to the child context', () => {
    const tree = renderer.create((
      <Session connector={mockConnector}>
        <Child />
      </Session>
    ));

    expect(tree.toJSON().props.context.sessionExecute).toBe(mockClient.execute);
  });
});

