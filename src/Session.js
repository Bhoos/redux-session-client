import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Session extends Component {
  constructor(props) {
    super(props);

    this.client = null;
  }

  getChildContext() {
    return {
      sessionExecute: this.client.execute,
    };
  }

  async componentWillMount() {
    const {
      connector,
      user,
      dispatch,
      options,
    } = this.props;
    this.client = connector(user, options, dispatch);
  }

  componentWillUnmount() {
    this.client.close();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Session.childContextTypes = {
  sessionExecute: PropTypes.func.isRequired,
};

Session.propTypes = {
  connector: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Session;
