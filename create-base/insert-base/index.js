"use strict";

const scenary = require("./scenary");
const athlete = require('./athlete');
const team = require('./teams');
const game = require('./game');
const event = require('./event');
const result = require('./result');
const sport = require('./sport');

const insert = (basic, analize) => {
  analize.formatter(basic.treatment, data => scenary(data, {
    athlete,
    team,
    game,
    event,
    result,
    sport,
  }, basic.insert));
};
module.exports.insert = insert;
