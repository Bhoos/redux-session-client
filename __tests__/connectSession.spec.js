import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

import { connectSession } from '../src';

describe('connectSession', () => {
  class SessionMock extends Component {
    getChildContext() {
      return { sessionExecute: this.props.execute };
    }
    render() {
      return Children.only(this.props.children);
    }
  }

  SessionMock.childContextTypes = {
    sessionExecute: PropTypes.func.isRequired,
  };

  // eslint-disable-next-line
  class Passthrough extends Component {
    render() {
      return <div />;
    }
  }

  it('should receive the the session', () => {
    const Container = connectSession(['fn1', 'fn2'])((
      props => (
        <Passthrough {...props} />
      )
    ));

    const mockExecute = jest.fn();
    const tree = renderer.create((
      <SessionMock execute={mockExecute}>
        <Container pass="through" />
      </SessionMock>
    ));


    const passthroughProps = tree.root.findByType(Passthrough).props;
    expect(passthroughProps.session).toHaveProperty('fn1');
    expect(passthroughProps.session).toHaveProperty('fn2');
    expect(passthroughProps.pass).toBe('through');
    expect(mockExecute.mock.calls).toHaveLength(0);
    passthroughProps.session.fn1(1, 2);
    expect(mockExecute.mock.calls).toHaveLength(1);
    expect(mockExecute.mock.calls[0]).toHaveLength(2);
    expect(mockExecute.mock.calls[0]).toEqual(['fn1', [1, 2]]);
    passthroughProps.session.fn2('one');
    expect(mockExecute.mock.calls[1]).toEqual(['fn2', ['one']]);
  });
});
