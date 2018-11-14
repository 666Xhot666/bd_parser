"use strict";

const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./storage/olympic_history.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message)});

const treatment = {};

treatment.lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./storage/athlete_events.csv')
}) ;

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

module.exports.treatment = treatment;
module.exports.db = db;
