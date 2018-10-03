const args = process.argv.slice(2);

const parameters = require('./parameter-parser');

const Sqlite = require('sqlite3').verbose();

const query = require('./search-data');

const diagram = require('./diagram');

const data = parameters(args);

if (args.length) {

  const db = new Sqlite.Database('./data/olympic_history.db', Sqlite.OPEN_READWRITE, (err) => {
    if (err) console.error(err.message);
    else {

      console.log('Connected to the olympic_history database.');

      searchToBuild(paramKey(data), db, data);
    }

  });

} else {
  console.error('For build diagram, please enter parameters');
};


paramKey = (data) => {
  if (data.chart_name === 'medals') {

    if (data.season && data.noc) {

      return {
        tableselect: 'teams.noc_name',
        year: data.year,
        diagtitle: 'year',
      };

    } else {
      return {
        err: 'season and noc'
      };
    };

  } else if (data.chart_name === 'topteams') {

    if (data.season) {

      return {
        tableselect: 'teams.noc_name',
        year: data.year,
        diagtitle: 'year',
      };

    } else {
      return {
        err: 'season'
      };
    };

  } else {
    return {
      err: 'chart_name'
    };
  };

};

searchToBuild = (option, db, data) => {
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
          data: row
        });

      } else {
        console.error('No search information in base with this parameters');
      }

    });
  }
};

error = (err) => {
  if (err) return `Please enter a ${err}`;
}
