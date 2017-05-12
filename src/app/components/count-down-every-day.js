import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

import DateHelper from '../utils/DateHelper';
import DateStringPrettifier from '../utils/DateStringPrettifier';
import Render from '../utils/Render';
import './count-down.css';

export default class CountDownEveryDay extends PureComponent {
  static propTypes = {
    targetHour: PropTypes.number,
    targetMinute: PropTypes.number,
    description: PropTypes.string,
  };

  static defaultProps = {
    targetHour: 0,
    targetMinute: 0,
    description: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  startCounting = () => {
    window.setInterval(() => {
      const targetDate = new Date();
      targetDate.setHours(this.props.targetHour, this.props.targetMinute, 0);
      if (Date.now() > targetDate.getTime()) {
        targetDate.setDate(targetDate.getDate() + 1);
      }
      const temp = DateHelper.prettifyTimeIntervalStartFromNow(targetDate);
      const [tdays, thours, tminutes, tseconds] = temp;
      this.setState({
        days: tdays,
        hours: thours,
        minutes: tminutes,
        seconds: tseconds,
      });
    }, 1000);
  };

  renderDescription = () => Render.renderDescription(this.props.description);

  renderDigit = () => {
    const params = [this.state.days, this.state.hours, this.state.minutes, this.state.seconds];
    const temp = DateStringPrettifier.prettifiyDateString(params);
    return Render.renderDigit(temp);
  };

  render() {
    return (
      <div className="container">
        {this.renderDescription()}
        {this.renderDigit()}
      </div>
    );
  }
}
