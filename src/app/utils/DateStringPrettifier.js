export default class DateStringPrettifier {
  static prettifiyDateString(dateComponents = [0, 0, 0, 0]) {
    const [days, hours, minutes, seconds] = dateComponents;
    const sdays = this.twoDigits(days);
    const shours = this.twoDigits(hours);
    const sminutes = this.twoDigits(minutes);
    const sseconds = this.twoDigits(seconds);

    return [sdays, shours, sminutes, sseconds];
  }

  static twoDigits(value) {
    if (value.toString().length <= 1) {
      return `0${value.toString()}`;
    }
    return value.toString();
  }
}
