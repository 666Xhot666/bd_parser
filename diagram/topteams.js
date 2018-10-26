"use strict";

const topTeams = function (args, diag, query, param) {
  const data = param.paramParse(args);

  if (data.season) {
    query.queryTopteams(data.season, data.medal, data.year, (data) => {
      if(data){
        diag.topteams(data);
      } else {
        console.log('Sorry but this information is exsist');
      };
    });
  } else {
    console.log('Please chose a season(summer or winter)');
  }
};

module.exports = topTeams;
