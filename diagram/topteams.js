module.exports = (args, diag, query, param) => {
  const data = param.paramParse(args);
  if (data.season) {
    query.queryTopteams(data.season, data.medal, data.year, (data) => {
      diag.topteams(data);
    })
  } else {
    console.log('Please chose a season(summer or winter)');
  }

}
