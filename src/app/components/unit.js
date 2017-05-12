import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import './unit.css';

export default class Unit extends PureComponent {
  static propTypes = {
    unit: PropTypes.string,
  };

  static defaultProps = {
    unit: 'unit',
  };

  render() {
    return (
      <div className="unit">{this.props.unit}</div>
    );
  }
}
