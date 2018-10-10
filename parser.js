const buildData = require('./build-data');
const buildBase = require('./build-database');

const data = buildData.createData();

Object.entries(data.gameData).forEach((row) => {
  if (row[1][0].length) {
    buildBase.writeToBaseValues({
      table: 'games',
      data: {
        year: row[0],
        season: 0,
        city: row[1][0],
      },
    });
  }
  if (row[1][1].length) {
    buildBase.writeToBaseValues({
      table: 'games',
      data: {
        year: row[0],
        season: 1,
        city: row[1][1],
      },
    });
  }
});

Object.entries(data.teamData).forEach((row) => {
  buildBase.writeToBaseValues({
    table: 'teams',
    data: {
      noc_name: row[1][0],
      name: row[1][1],
    },
  });
});

Object.entries(data.sportData).forEach((row) => {
  buildBase.writeToBaseValues({
    table: 'sports',
    data: {
      name: row[1],
    },
  });
});

Object.entries(data.eventData).forEach((row) => {
  buildBase.writeToBaseValues({
    table: 'events',
    data: {
      name: row[1],
    },
  });
});


Object.entries(data.athletesData).forEach((row) => {
  buildBase.writeToBaseSelect({
    table: 'athletes',
    data: {
      full_name: row[0],
      sex: row[1][1],
      age: row[1][2],
      params: row[1][3],
      team_id: row[1][4],
    },
  });
});

Object.entries(data.resultData).forEach((row) => {
  buildBase.buildResultTable({
    table: 'results',
    data: {
      athlete_id: 'athletes.id',
      event_id: 'events.id',
      game_id: 'games.id',
      sport_id: 'sports.id',
      medal: row[1][5],

    },

    where: {
      'athletes.full_name': row[0],
      'games.year': row[1][1],
      'games.season': row[1][2],
      'sports.name': row[1][3],
      'events.name': row[1][4],
    },

    from: 'athletes, events, games, sports',

  });
});
