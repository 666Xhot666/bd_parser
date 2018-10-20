// result-table-insert
exports.insertTable = (data, sportId, eventId, gameId, athleteId, clear) => {
  Object.keys(data).forEach((row) => {
    Object.keys(data[row].Games).forEach((values) => {
      Object.keys(data[row].Games[values].Event).forEach((value) => {
        clear.writeToBase({
          table: 'results',
          data: {
            athlete_id: athleteId[row],
            game_id: gameId[values],
            sport_id: sportId[data[row].Games[values].Sport],
            event_id: eventId[value],
            medal: data[row].Games[values].Event[value],
          },
        });
      });
    });
  });
};
