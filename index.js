const args = process.argv.slice(2)
const Sqlite = require('sqlite3').verbose();

if (args.length) {

  const Diagram = require('./Diagram.js');
  //const DataBase = require('./DataBase.js');

  var noc, season, medal = '>0', year , a = 0, chart_name

  for (var key in args) {

    var param = args[key].toLowerCase()

    if (param.length == 3) noc = param.toUpperCase();
    if(Number(param)) year = ' AND games.Year = ' + param;
    if (param == 'summer' || param == 'winter') season = (param == 'summer') ? 0 : 1;
    if (param == 'gold' || param == 'silver' || param == 'bronze') medal = (param == 'gold') ? '=1 ' : (param == 'gold') ? '=2' : '=3'
    if(param == 'topteams' || param == 'medals') chart_name = param;
  }

  if (chart_name == void 0 )  console.log('Error please enter chart_name of diagram');
  if (chart_name == 'medals'){
    if(season != void 0 & noc != void 0){
    const db = new Sqlite.Database('./data/olympic_history.db', Sqlite.OPEN_READWRITE, (err) => {

    if (err) console.error(err.message)
    else console.log('Connected to the olympic_history database.');

    db.all(`SELECT games.year, results.medal FROM athletes, teams, results, games WHERE teams.noc_name="${noc}" AND games.season="${season}" AND athletes.team_id=teams.id AND results.game_id=games.id AND results.athlete_id=athletes.id AND medal${medal}`, (err, row) => {

      Diagram({
        'title': 'year',
        'data': row
          })

        })

      })
    }
      else console.log('Please enter season and noc ');
  }

  if (chart_name == 'topteams'){
    const db = new Sqlite.Database('./data/olympic_history.db', Sqlite.OPEN_READWRITE, (err) => {

    if (err) console.error(err.message)
    else console.log('Connected to the olympic_history database.');
    db.all(`SELECT teams.noc_name, results.medal
              FROM athletes, teams, results, games
                WHERE games.season=${season}  ${year}
                  AND athletes.team_id=teams.id AND results.game_id=games.id AND results.athlete_id=athletes.id AND medal ${medal}`, (err, row) => {

    Diagram({
        'title': 'noc_name',
        'data': row
          })

        })

      })
  }
} 
