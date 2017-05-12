export default class DateHelper {

  static millisecondsInADay = 1000 * 60 * 60 * 24;
  static daysInAWeek = 7;

  /**
   * 获取两个时间之间的间隔
   * @param {*开始时间} startDate
   * @param {*结束时间} endDate
   */
  static timeInterval(startDate, endDate) {
    if (startDate && endDate) {
      return Math.trunc(endDate.getTime() / 1000) - Math.trunc(startDate.getTime() / 1000);
    }

    return 0;
  }

  /**
   * 将时间间隔转化为 [日, 时, 分, 秒]
   * @param {*时间间隔，单位为毫秒} timeInterval
   */
  static prettifyTimeInterval(timeInterval) {
    const seconds = timeInterval % 60;
    const minutes = Math.trunc(timeInterval / 60) % 60;
    const hours = Math.trunc(timeInterval / 60 / 60) % 24;
    const days = Math.trunc(timeInterval / 60 / 60 / 24);

    return [days, hours, minutes, seconds];
  }

  /**
   * 从今天开始到结束日期的时间间隔转化为 [日, 时, 分, 秒]
   * @param {*结束日期} endDate
   */
  static prettifyTimeIntervalStartFromNow(endDate) {
    const timeInterval = this.timeInterval(new Date(), endDate);
    return this.prettifyTimeInterval(timeInterval);
  }

  /**
   * 从某一个日期开始，通过指定一个星期中的具体一天，计算出目标时间
   * @param {*开始计算的日期} anchorDate
   * @param {*一个星期中的某一天，0为星期天，1为星期一} day
   * @param {*目标小时} hour
   * @param {*目标分钟} minute
   */
  static getTargetDateInAWeek(anchorDate, day = 0, hour = 0, minute = 0) {
    let targetDate = null;
    const targetTotalMilliSeconds = (intervalDays) => {
      const intervalMilliSeconds = intervalDays * this.millisecondsInADay;
      const totalMilliSeconds = anchorDate.getTime() + intervalMilliSeconds;
      return totalMilliSeconds;
    };

    if (day === anchorDate.getDay()) {
      const testDate = new Date();
      testDate.setHours(hour, minute);
      const targetDateSeconds = Math.trunc(Date.now() / 1000);
      const testDateSeconds = Math.trunc(testDate.getTime() / 1000);
      if (targetDateSeconds - testDateSeconds < 0) {
        // future is today
        targetDate = new Date();
      } else {
        // future is today in the next week
        const totalMilliSeconds = targetTotalMilliSeconds(this.daysInAWeek);
        targetDate = new Date(totalMilliSeconds);
      }
    } else if (day >= anchorDate.getDay()) {
      // future is in this week
      const intervalDays = day - anchorDate.getDay();
      const totalMilliSeconds = targetTotalMilliSeconds(intervalDays);
      targetDate = new Date(totalMilliSeconds);
    } else {
      // future is in the next week
      const intervalDays = this.daysInAWeek - anchorDate.getDay() + day;
      const totalMilliSeconds = targetTotalMilliSeconds(intervalDays);
      targetDate = new Date(totalMilliSeconds);
    }

    targetDate.setHours(hour, minute, 0);
    return targetDate;
  }

  static getTargetDateInAMonth(anchorDate, day = 1, hour = 0, minute = 0) {
    const targetDate = new Date();

    if (day === anchorDate.getDate()) {
      const testDate = new Date();
      testDate.setHours(hour, minute);
      const targetDateSeconds = Math.trunc(targetDate.getTime() / 1000);
      const testDateSeconds = Math.trunc(testDate.getTime() / 1000);
      if (targetDateSeconds - testDateSeconds < 0) {
        // future is today
        targetDate.setDate(day);
      } else {
        // future is in the next month
        targetDate.setMonth(anchorDate.getMonth() + 1);
        targetDate.setDate(day);
      }
    } else if (day >= anchorDate.getDate()) {
      // future is in this month
      targetDate.setDate(day);
    } else {
      // future is in the next month
      targetDate.setMonth(anchorDate.getMonth() + 1);
      targetDate.setDate(day);
    }

    targetDate.setHours(hour, minute, 0);
    return targetDate;
  }
}
