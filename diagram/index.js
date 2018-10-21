const args = process.argv.slice(2);

const bd = require('../bd');
const diag = require('./diagram');

const season = (option, callback) => {
  if ((option).includes('summer')) callback('0');
  if ((option).includes('winter')) callback('1');
  else console.log('Please chose a season (summer or winter)');
};

const medal = (option, callback) => {
  if ((option).includes('gold')) {
    callback('= 1');
  } else if ((option).includes('silver')) {
    callback('= 2');
  } else if ((option).includes('bronze')) {
    callback('= 3');
  } else callback('> 0');
};

const noc = (option, chart, callback) => {
  option.forEach((values, index) => {
    values = values.toUpperCase();
    if (values.length === 3 && chart === 'medals') callback(`${values}`);
    else if (+values && chart === 'topteams') callback(`${values}`);
    else if (index === option.length - 1 && chart === 'medals') console.log('Please enter noc');
    else if (index === option.length - 1 && chart === 'topteams') callback('');
  });
};

const bdQuery = (column, title, chart) => {
  season(args, (season) => {
    medal(args, (medal) => {
      noc(args, chart, (value) => {
        bd.searchData(column, season, medal, value, (row) => {
          if(row){
          diag(title, row, chart);
        } else 
          console.log('Sorry but this information is not exsist');
        });
      });
    });
  });
};

if ((args).includes('medals')) bdQuery('games.year', 'year', 'medals');
else if ((args).includes('topteams')) bdQuery('teams.noc_name', 'teams', 'topteams');
else console.log('Please enter a right chart_name (medals or topteams)');
