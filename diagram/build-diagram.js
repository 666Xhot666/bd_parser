"use strict";

const str = String.fromCharCode(0x258C);
const medal = 'COUNT(results.medal)';

function mathMiddle(data, medal, callback) {
  let middle = 0;

  Object.values(data).forEach((row, index) => {
    middle += row[medal];
    if (index + 1 === data.length) {
      callback(middle / index);
    }
  });
}

const diagram = {
  topteams: (data) => {
    const coef = 200 / data[0][medal];

    console.clear();
    console.log('Team', 'Amount');
    mathMiddle(data, medal, (middle) => {
      Object.values(data).forEach((row) => {
        if (row[medal] > middle) {
          console.log(row.noc_name, (row[medal] * coef > 1) ? str.repeat(row[medal] * coef) : str);
        }
      });
    });
  },

  medals: (data) => {
    const temporary = {};
    data.forEach(row => temporary[row.year] = row[medal]);
    const coef = 200 / Math.max.apply(null, Object.values(temporary));
    console.clear()
    console.log('Year', 'Amount');
    data.forEach((row) => {
       console.log(row.year, (row[medal] * coef > 1) ? str.repeat(row[medal] * coef) : str);
    });
  },
};

module.exports = diagram;
