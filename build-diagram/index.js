const args = process.argv.slice(2);
const sqlite = require('sqlite3').verbose();

const parameters = require('./parameter-parser');

const query = require('./search-data');

const diagram = require('./diagram');

const data = parameters(args);

const error = err => `Please enter a ${err}`;


const paramKey = (data) => {
  if (data.chart_name === 'medals') {
    if (data.season && data.noc) {
      return {
        tableselect: 'games.year',
        noc: data.noc,
        diagtitle: 'noc_name',
      };
    }
    return {
      err: 'season and noc',
    };
  } if (data.chart_name === 'topteams') {
    if (data.season) {
      return {
        tableselect: 'teams.noc_name',
        year: data.year,
        diagtitle: 'team',
      };
    }
    return {
      err: 'season',
    };
  }
  return {
    err: 'chart_name',
  };
};

const searchToBuild = (option, db, data) => {
  if (option.err) {
    console.error(error(option.err));
  } else {

    db.all(query({
      tableselect: option.tableselect,
      season: data.season,
      medal: data.medal,
      noc: option.noc,
      year: option.year,
    }), (err, row) => {
      if (row.length) {
        diagram({
          title: option.diagtitle,
          data: row,
        });
      } else {
        console.error('No search information in base with this parameters');
      }
    });
  }
};

  const db = new sqlite.Database('./data/olympic_history.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) console.error(err.message);
    else {
      console.log('Connected to the olympic_history database.');
      searchToBuild(paramKey(data), db, data);
    }
  });
