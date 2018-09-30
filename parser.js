const sqlite3 = require('sqlite3').verbose();
const buildData = require('./build-data.js');
const buildBase = require('./build-database.js');
const data = buildData();

for (let key in data.sportData) {
    buildBase.writeToBaseValues({
      table: 'sports',
      data: {
        name: data.sportData[key],
      }
    });
};
for (let key in data.eventData) {
    buildBase.writeToBaseValues({
      table: 'events',
      data: {
        name: data.eventData[key],
      }
    });
};
for (let key in data.teamData) {
    buildBase.writeToBaseValues({
      table: 'teams',
      data: {
        noc_name:data.teamData[key][0],
        name: data.teamData[key][1],
      }
    });
};
for (let key in data.gameData) {
  if (data.gameData[key][0].length){
        buildBase.writeToBaseValues({
          table: 'games',
          data: {
            year: key,
            season: 0,
            city: data.gameData[key][0],
          }
        });
    };
    if (data.gameData[key][1].length){
          buildBase.writeToBaseValues({
            table: 'games',
            data: {
              year: key,
              season: 1,
              city: data.gameData[key][1],
            }
          });
      };
};
for (let key in data.athletesData) {
  buildBase.writeToBaseSelect({
    table: 'athletes',
    data: {
       full_name: key,
       sex: data.athletesData[key][1],
       age: data.athletesData[key][2],
       params: data.athletesData[key][3],
       team_id: data.athletesData[key][4] ,
    }
  });
};
for (let key in data.resultData) {
  buildBase.buildResultTable({
    table: 'results',
    data: {
       athlete_id: 'athletes.id',
       event_id: 'events.id',
       game_id: 'games.id',
       sport_id: 'sports.id',
       medal: data.resultData[key][5],

    },

    where:{
      'athletes.full_name': key,
      'games.year': data.resultData[key][1],
      'games.season': data.resultData[key][2] ,
      'sports.name': data.resultData[key][3],
      'events.name': data.resultData[key][4],
    },

    from : 'athletes, events, games, sports'

  });

};
