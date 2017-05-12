import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import './digit.css';

export default class Digit extends PureComponent {
  static propTypes = {
    digit: PropTypes.string,
  };

  static defaultProps = {
    digit: '00',
  };

  render() {
    return (
      <div className="digit">{this.props.digit}</div>
    );
  }
}
