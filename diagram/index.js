"use strict";

const args = process.argv.slice(2);

const medals = require('./medals');
const topteams = require('./topteams');
const diag = require('./build-diagram');
const query = require('./query');

const param = require('./param-build');

if (args[0] === 'medals') {
  medals(args.slice(1), diag, query, param);
} else if (args[0] === 'topteams') {
  topteams(args.slice(1), diag, query, param);
} else {
  console.log('Please enter a right chart_name(medals or topteams)');
}
