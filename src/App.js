import React from 'react';

import CountDownOnce from './app/components/count-down-once';
import CountDownEveryDay from './app/components/count-down-every-day';
import CountDownEveryWeek from './app/components/count-down-every-week';
import CountDownEveryMonth from './app/components/count-down-every-month';
import './App.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counters: [],
    };
  }

  componentDidMount() {
    this.state.counters.forEach((element) => {
      element.startCounting();
    });
  }

  render() {
    const date = new Date();
    date.setDate(30);
    date.setHours(24, 0);
    return (
      <div className="appContainer">
        <CountDownOnce
          ref={(instance) => { this.state.counters.push(instance); }}
          description={'Countdown once'}
          year={date.getFullYear()}
          month={date.getMonth()}
          day={date.getDate()}
          hour={date.getHours()}
          minute={date.getMinutes()}
        />
        <CountDownEveryDay
          ref={(instance) => { this.state.counters.push(instance); }}
          description={'Countdown every day'}
          targetHour={15}
          targetMinute={23}
        />
        <CountDownEveryWeek
          ref={(instance) => { this.state.counters.push(instance); }}
          description={'Count down every week'}
          targetDay={0}
          targetHour={23}
          targetMinute={48}
        />
        <CountDownEveryMonth
          ref={(instance) => { this.state.counters.push(instance); }}
          description={'Count down every month'}
          targetDay={1}
          targetHour={23}
          targetMinute={25}
        />
      </div>
    );
  }
}

