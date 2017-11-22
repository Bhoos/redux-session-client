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
    const { connector } = this.props;
    this.client = connector();
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
};

export default Session;
