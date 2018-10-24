"use strict";

const medals = function (args, diag, query, param) {
  const data = param.paramParse(args);

  if (data.season) {
    if (data.noc) {
      query.queryMedals(data.season, data.medal, data.noc, (data) => {
        diag.medals(data);
      });
    } else {
      console.log('Please chose a noc_name');
    }
  } else {
    console.log('Please chose a season(summer or winter)');
  }
};

module.exports = medals;
