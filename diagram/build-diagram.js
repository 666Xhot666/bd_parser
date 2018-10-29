"use strict";

class Normalize {
  constructor(data) {

    this.data = data;
    this.result = {};

    this.data.forEach(row => {

      if (!this.result[row.year]) {

        if (row.medal === 0) {
          this.result[row.year] = 0;
        } else {
          this.result[row.year] = 1;
        };

      } else if (row.medal !== 0) this.result[row.year] += 1;

    });
    return this.result;
  };
};

class MiddleValue {
  constructor(data){
    this.middle = 0;
    Object.values(data).forEach((row, index) => {
          this.middle += row.medal;
     });
     this._middle = this.middle/data.length
  };
  getMiddle(){
    return this._middle
  }
};

module.exports = class Diagram {

  constructor(data) {
    this.data = data;
    this.str = String.fromCharCode(9608);
    this.maxLenght = 200;
  };

  medals() {
    const data = new Normalize(this.data);

    this.coef = this.maxLenght / Math.max.apply(null, Object.values(data));

    Object.entries(data).forEach(row => {

      console.log(row[0], this.str.repeat(row[1] * this.coef));
      console.log('');

    });
  };

  topteams() {
    this.coef = this.maxLenght / this.data[0].medal;
    const middle = new MiddleValue(this.data).getMiddle();
    console.log('Team', 'Amount');
    Object.values(this.data).forEach((row) => {
      if (row.medal > middle)
      console.log(row.noc_name,this.str.repeat(row.medal * this.coef));
    });
  };
};
