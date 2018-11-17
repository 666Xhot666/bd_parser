"use strict";

const Build = require('./param')
const CallChart = require('./chart')

const basic = require ('../create-base/basic-value')

module.exports = class {
  constructor(name, cmdParam) {
    this.chart = name;

    this.build = new Build(cmdParam)
    this.diagram = new CallChart(this.build,basic.db);

    this.diagram[this.chart]();
  };
};
