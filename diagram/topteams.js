const args = process.argv.slice(3);

const param = require('./param-build');
const query = require('./query');
const diag = require('./diagram');

const data = param.paramParse(args);

if (data.season) {
  query.queryTopteams(data.season, data.medal, data.year, (data) =>{
  diag(data);  
  })
} else {
  console.log('Please chose a season(summer or winter)');
}
