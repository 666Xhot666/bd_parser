// build-database
const baseInsert = require('../bd');
const buidData = require('./build-data');
const teamInsert = require('./team');
const sportInsert = require('./sport');
const eventInsert = require('./event');
const gameInsert = require('./game');
const athleteInsert = require('./athlete');
const resultInsert = require('./result');

baseInsert.clearBase().then(() => {
  const data = buidData.createData();
  const teamId = teamInsert.insertTable(data.teamData, baseInsert);
  const sportId = sportInsert.insertTable(data.sportData, baseInsert);
  const eventId = eventInsert.insertTable(data.eventData, baseInsert);
  const gameId = gameInsert.insertTable(data.gameData, baseInsert);
  const athleteId = athleteInsert.insertTable(data.athletesData, teamId, baseInsert);
  resultInsert.insertTable(data.athlete, sportId, eventId, gameId, athleteId, baseInsert);
});
