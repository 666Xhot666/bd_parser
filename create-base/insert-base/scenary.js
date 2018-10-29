module.exports = (data, tables, insert) => {
  insert.clearBase().then(() => {
    tables.team.insertTable(data.teamData, insert);
    tables.sport.insertTable(data.sportData, insert);
    tables.event.insertTable(data.eventData, insert);
    tables.game.insertTable(data.gameData, insert);
    tables.athlete.insertTable(data.athletesData, insert);
    tables.result.insertTable(data.athlete,insert);
  });
};
