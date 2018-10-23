`use strict`
const args = process.argv.slice(2);

if (args[0] === 'medals') create: require('./medals');
else if (args[0] === 'topteams') create: require('./topteams');
else console.log('Please enter a right chart_name(medals or topteams)');
