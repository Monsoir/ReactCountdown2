import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';

import DateHelper from '../utils/DateHelper';
import DateStringPrettifier from '../utils/DateStringPrettifier';
import Render from '../utils/Render';
import './count-down.css';

export default class CountDownOnce extends PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
  };

  static defaultProps = {
    date: null,
    description: '',
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
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
      let date = null;
      if (this.props.date) {
        date = this.props.date;
      } else {
        date = new Date();
        date.setFullYear(this.props.year, this.props.month, this.props.day);
        date.setHours(this.props.hour, this.props.minute, 0);
      }
      const temp = DateHelper.prettifyTimeIntervalStartFromNow(date);
      const [tdays, thours, tminutes, tseconds] = temp;
      this.setState({
        days: tdays,
        hours: thours,
        minutes: tminutes,
        seconds: tseconds,
      });
    }, 1000);
  };

  renderDigit = () => {
    const params = [this.state.days, this.state.hours, this.state.minutes, this.state.seconds];
    const temp = DateStringPrettifier.prettifiyDateString(params);
    return Render.renderDigit(temp);
  };

  renderDescription = () => Render.renderDescription(this.props.description);

  render() {
    return (
      <div className="container">
        {this.renderDescription()}
        {this.renderDigit()}
      </div>
    );
  }

}
