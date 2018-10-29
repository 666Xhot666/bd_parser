"use strict";

const fs = require('fs');
const path = require('path');
const insert = require('../database');

const treatment = {};

treatment.file = fs.readFileSync(
  path.join(__dirname, '../storage/athlete_events.csv'), {
    encoding: 'utf-8',
  },
  err => console.log(err),
).split('\r\n');

treatment.headers = treatment.file.shift().replace(/["\r]/g, '').split(',');

treatment.rep = /("\s*)|(\s\([-A-z,]*\))|(\s\([-A-z, ]*\))/g;
treatment.spl = /,(?!0|\s|\s-|[0-9]{3}\s)/g;

treatment.basic = {
  season: {
    Summer: '0',
    Winter: '1',
  },
  medal: {
    Gold: '1',
    Silver: '2',
    Bronze: '3',
    NA: '0',
  },
};
treatment.data = {
  athlete: {},
  gameData: {},
  teamData: {},
  sportData: {},
  eventData: {},
  athletesData: {},
};

module.exports.treatment = treatment;
module.exports.insert = insert;
