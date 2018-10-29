"use strict";

const Build = require('./param')
const CallChart = require('./chart')

module.exports = class {
  constructor(name, cmdParam) {
    this.chart = name;

    this.build = new Build(cmdParam)
    this.diagram = new CallChart(this.build);

    this.diagram[this.chart]();
  };
};
