"use strict";

class Normalize {
  constructor(data) {
    this.data = data;
    this.len = data.length;
    this.middle = 0;
    this.result = {};
  };
  getNormalMedals() {
    this.data.forEach((row) => {
      this.result[row.year] = row.medals;
    })
    return this.result;
  }
  getNormalTeams() {
    this.data.forEach((row) => {
      this.result[row.noc] = row.medals;
      this.middle += row.medals;
    })
    return {
      result: this.result,
      middle: this._middle = this.middle / this.len
    };
  }
};

module.exports = class Diagram {

  constructor(data) {
    this.data = new Normalize(data);
    this.str = String.fromCharCode(9608);
    this.maxLenght = 200;
  };

  medals() {
    const data = this.data.getNormalMedals();
    this.coef = this.maxLenght / Math.max(...Object.values(data));

    console.log('Year', 'Amount');
    Object.entries(data).forEach(row => {
      console.log(row[0], this.str.repeat(row[1] * this.coef));
      console.log('');
    });
  };

  topteams() {
    const data = this.data.getNormalTeams();
    this.coef = this.maxLenght / Math.max(...Object.values(data.result));

    console.log('Team', 'Amount');

    Object.entries(data.result).forEach((row) => {
      if (row[1] > data.middle)
        console.log(row[0], this.str.repeat(row[1] * this.coef));
    })
  };

};
