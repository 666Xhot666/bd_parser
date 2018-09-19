const Fs = require('fs')
const Path = require('path')
const sqlite = require('sqlite3').verbose();
const FileName = '/data/athlete_events.csv'
const FilePath = Path.join(__dirname, FileName);
const rep = /("\s*)|(\s\([-A-z,]*\))/g
const spl = /,(?!0|\s|\s-|500|980)/g

var File = Fs.readFileSync(FilePath, {
  encoding: 'utf-8'
})

Fs.close();

File = File.split('\r\n')

var Headers = File.shift().replace(/["\r]/g, '').split(','),
  OutPath = Path.join(__dirname, FileNameOut),
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

    TeamJson[TMPJson.NOC] = [TMPJson.NOC, TMPJson.Team]
    SportJson[TMPJson.Sport] = TMPJson.Sport
    EventJson[TMPJson.Event] = TMPJson.Event
    AthletesJson[TMPJson.Name] = [TMPJson.Name, TMPJson.Sex, TMPJson.Age, [TMPJson.Weight, TMPJson.Height], TMPJson.ID]

    if (TMPJson.Year != 1906) {
      ResultJson[TMPJson.Name] = [TMPJson.Name, TMPJson.Year, TMPJson.Season, TMPJson.City, TMPJson.Sport, TMPJson.Event, TMPJson.Medal]
      if (GameJson[TMPJson.Year] === void 0) GameJson[TMPJson.Year] = {
        0: [],
        1: []
      }
      else if (GameJson[TMPJson.Year][TMPJson.Season].indexOf(TMPJson.City) == -1) GameJson[TMPJson.Year][TMPJson.Season].push(TMPJson.City)
    }

  })

  console.log('Connected to the olympic_history database.');

   for (var row in SportJson) {
     db.run(`INSERT or REPLACE INTO sports(name) VALUES("${SportJson[row]}")`)
   }
   for (var row in EventJson) {
     db.run(`INSERT or REPLACE INTO events(name) VALUES("${EventJson[row]}")`)
   }
   for (var row in AthletesJson) {
     let AthletesRow = AthletesJson[row];
     db.run(`INSERT or REPLACE INTO athletes(full_name,sex,age,params,team_id) VALUES("${AthletesRow[0]}","${AthletesRow[1]}","${AthletesRow[2]}","${AthletesRow[3]}","${AthletesRow[4]}")`)
   }
   for (var row in TeamJson) {
    let TeamJsonRow = TeamJson[row];
     if (TeamJsonRow[0] != void 0) db.run(`INSERT or REPLACE INTO teams(noc_name,name) VALUES("${TeamJsonRow[0]}","${TeamJsonRow[1]}")`)
   }
   for (var col in GameJson) {
     let GameJsonCol = GameJson[col];
 
     if (GameJsonCol[0].length != 0) db.run(`INSERT or REPLACE INTO games(year,season,city) VALUES("${col}","0","${GameJsonCol[0]}")`)
     if (GameJsonCol[1].length != 0) db.run(`INSERT or REPLACE INTO games(year,season,city) VALUES("${col}","1","${GameJsonCol[1]}")`)
  }

  var JsonId = {
    a: [],
    b: [],
    c: [],
    d: []
  }

  for (var row in ResultJson) {

    var ResultJsonRow = ResultJson[row]
    let Name = ResultJsonRow[0],
      Year = ResultJsonRow[1],
      Season = ResultJsonRow[2],
      Sport = ResultJsonRow[4],
      Event = ResultJsonRow[5],
      Medal = ResultJsonRow[6]

    db.get(`SELECT id  FROM athletes WHERE full_name = "${Name}"`, function(err, athlete) {
      JsonId.a.push(athlete.id)
      db.get(`SELECT id FROM games WHERE year = "${Year}" and Season = "${Season}"`, function(err, game) {
        JsonId.b.push(game.id)
        db.get(`SELECT id FROM sports WHERE name = "${Sport}"`, function(err, sport) {
          JsonId.c.push(sport.id)
          db.get(`SELECT id FROM events WHERE name = "${Event}"`, function(err, event) {
            JsonId.d.push(event.id)

            console.log(JsonId);
            db.run(`INSERT or REPLACE INTO results(athlete_id, game_id, sport_id, event_id, medal) VALUES("${JsonId.a}","${JsonId.b}","${JsonId.c}","${JsonId.d}","${Medal}") `)

          })
        })
      })
    })

  }

});
