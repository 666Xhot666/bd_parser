const args = process.argv.slice(3);

const param = require('./param-build');
const query = require('./query');
const diag = require('./diagram');

const data = param.paramParse(args);

if (data.season) {
  if (data.noc) {
      query.queryMedals(data.season,data.medal, data.noc,(data)=>{
        diag.medals(data);
      });
  } else {
    console.log('Please chose a noc_name');
  }
} else {
  console.log('Please chose a season(summer or winter)');
}
