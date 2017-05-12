import React from 'react';
import DigitUnit from '../components/digit-unit';

import '../../App.css';

const styles = {
  descriptionException: {
    color: 'red',
    textAlign: 'center',
    fontSize: 50,
  },

  digitException: {
    color: 'red',
    textAlign: 'center',
    fontSize: 40,
  },

  digitSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
  },
};

export default class Render {
  static renderDescription(description) {
    if (description && description.length > 0) {
      return (
        <div className="description">{description}</div>
      );
    }

    return (
      <p style={styles.descriptionExceptionStyle}>{'NO DESCRIPTION PROVIDED'}</p>
    );
  }

  static renderDigit(dateComponent) {
    if (dateComponent) {
      const [days, hours, minutes, seconds] = dateComponent;
      return (
        <div className="digitSection">
          <DigitUnit digit={`${days}`} unit={'Days'} />
          <DigitUnit digit={`${hours}`} unit={'Hours'} />
          <DigitUnit digit={`${minutes}`} unit={'Minutes'} />
          <DigitUnit digit={`${seconds}`} unit={'Seconds'} />
        </div>
      );
    }

    return (
      <p style={styles.styleExceptionStyle}>{'NO DATE PROVIDED'}</p>
    );
  }
}
