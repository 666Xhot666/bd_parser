const Fs = require('fs')
const Path = require('path')
const sqlite = require('sqlite3').verbose();
const Diagram = require('./Diagram.js');

const FileName = '/data/athlete_events.csv'
const FilePath = Path.join(__dirname, FileName);

const rep = /("\s*)|(\s\([-A-z,]*\))/g
const spl = /,(?!0|\s|\s-|500|980)/g

var File = Fs.readFileSync(FilePath, {
  encoding: 'utf-8'
}, function(err) {
  console.log(err);
})

File = File.split('\r\n')

var Headers = File.shift().replace(/["\r]/g, '').split(','),
  JsonFormatting = [],
  GameJson = {},
  TeamJson = {},
  TMPJson = {},
  SportJson = {},
  EventJson = {},
  AthletesJson = {},
  ResultJson = {},
  Season = {};

for (var row in Headers) {
  TMPJson[Headers[row]] = undefined
}

const db = new sqlite.Database('./data/olympic_history.db', sqlite.OPEN_READWRITE, (err) => {

  if (err) console.error(err.message)

  File.forEach(function(Row) {

    var RowFormatting = Row.replace(rep, "").split(spl),
      col = 0

    for (var row in Headers) {
      TMPJson[Headers[row]] = RowFormatting[col]
      col++
    }

    TMPJson.Medal = (TMPJson.Medal == 'NA') ? 0 : (TMPJson.Medal == 'Gold') ? 1 : (TMPJson.Medal == 'Silver') ? 2 : 3;
    TMPJson.Sex = (TMPJson.Sex == 'NA') ? null : TMPJson.Sex;
    TMPJson.Age = (TMPJson.Age == 'NA') ? null : TMPJson.Age;
    TMPJson.Season = (TMPJson.Season == 'Summer') ? 0 : 1;
    TMPJson.Weight = (TMPJson.Weight == 'NA') ? '' : TMPJson.Weight;
    TMPJson.Height = (TMPJson.Height == 'NA') ? '' : TMPJson.Height

    if (TMPJson.NOC != void 0) TeamJson[TMPJson.NOC] = [TMPJson.NOC, TMPJson.Team]
    SportJson[TMPJson.Sport] = TMPJson.Sport
    EventJson[TMPJson.Event] = TMPJson.Event
    AthletesJson[TMPJson.Name] = [TMPJson.Name, TMPJson.Sex, TMPJson.Age, [TMPJson.Weight, TMPJson.Height], TMPJson.NOC]
    if (TMPJson.Year != 1906) {
      ResultJson[TMPJson.Name] = [TMPJson.Name, TMPJson.Year, TMPJson.Season, TMPJson.Sport, TMPJson.Event, TMPJson.Medal]
      if (GameJson[TMPJson.Year] === void 0) GameJson[TMPJson.Year] = {
        0: [],
        1: []
      }
      else if (GameJson[TMPJson.Year][TMPJson.Season].indexOf(TMPJson.City) == -1) GameJson[TMPJson.Year][TMPJson.Season].push(TMPJson.City)
    }

  })

  console.log('Connected to the olympic_history database.');

  return 0;

  for (var row in SportJson) {
    db.run(`INSERT or REPLACE INTO sports(name) VALUES("${SportJson[row]}")`)
  }
  for (var row in EventJson) {
    db.run(`INSERT or REPLACE INTO events(name) VALUES("${EventJson[row]}")`)
  }

  for (var row in TeamJson) {
    let TeamJsonRow = TeamJson[row];
    db.run(`INSERT or REPLACE INTO teams(noc_name,name) VALUES("${TeamJsonRow[0]}","${TeamJsonRow[1]}")`)
  }

  for (var col in GameJson) {
    let GameJsonCol = GameJson[col];

    if (GameJsonCol[0].length != 0) db.run(`INSERT or REPLACE INTO games(year,season,city) VALUES("${col}","0","${GameJsonCol[0]}")`)
    if (GameJsonCol[1].length != 0) db.run(`INSERT or REPLACE INTO games(year,season,city) VALUES("${col}","1","${GameJsonCol[1]}")`)
  }

  for (var row in AthletesJson) {
    let AthletesRow = AthletesJson[row];
    db.run(`INSERT INTO athletes(team_id, full_name, sex, age, params)
            SELECT teams.id, "${AthletesRow[0]}","${AthletesRow[1]}","${AthletesRow[2]}","${AthletesRow[3]}" FROM teams
                    WHERE teams.noc_name = "${AthletesRow[4]}"`)
  }

  for (var row in ResultJson) {
    var ResultJsonRow = ResultJson[row]
    let Name = ResultJsonRow[0],
      Year = ResultJsonRow[1],
      Season = ResultJsonRow[2],
      Sport = ResultJsonRow[3],
      Event = ResultJsonRow[4],
      Medal = ResultJsonRow[5]
    db.get(`INSERT INTO results(athlete_id, event_id, game_id, sport_id, medal) SELECT athletes.id, events.id, games.id, sports.id, "${Medal}" FROM athletes, events, games, sports, teams
                    WHERE athletes.full_name="${Name}"
                    AND events.name="${Event}"
                    AND games.year="${Year}" and games.season="${Season}"
                    AND sports.name="${Sport}"
                    LIMIT 1`, (err, row) => {
      console.log(err)
    });
  }
});
