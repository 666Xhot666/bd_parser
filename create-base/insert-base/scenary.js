module.exports = (data, tables, insert) => {
  insert.clearBase().then(() => {
    const teamId = tables.team.insertTable(data.teamData, insert);
    const sportId = tables.sport.insertTable(data.sportData, insert);
    const eventId = tables.event.insertTable(data.eventData, insert);
    const gameId = tables.game.insertTable(data.gameData, insert);
    const athleteId = tables.athlete.insertTable(data.athletesData, teamId, insert);
    tables.result.insertTable(data.athlete, sportId, eventId, gameId, athleteId, insert);
  });
};
