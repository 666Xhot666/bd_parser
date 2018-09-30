const args = process.argv.slice(2)

const Sqlite = require('sqlite3').verbose();

if (args.length) {
  const db = new Sqlite.Database('./data/olympic_history.db', Sqlite.OPEN_READWRITE, (err) => {
    if (err) console.error(err.message);
    else {

      const parameters = require('./parameter-parser.js')
      const data = parameters(args);

      const query = require('./search-data.js')

      const Diagram = require('./diagram.js');

      console.log('Connected to the olympic_history database.');

      switch (data.chart_name) {

        case 'medals':
          {
            if (data.season != undefined && data.noc != undefined) {

              db.all(query({
                tableselect: 'games.year',
                season: data.season,
                medal: data.medal,
                noc: data.noc,
              }), (err, row) => {

                Diagram({
                  'title': 'noc_name',
                  'data': row
                });

              });

            } else {
              console.log('Please enter season and noc');
            };

          }
          break;

        case 'topteams':
          {
            if (data.season != undefined) {

              db.all(query({
                tableselect: 'teams.noc_name',
                season: data.season,
                medal: data.medal,
                year: data.year,
              }), (err, row) => {

                Diagram({
                  'title': 'team',
                  'data': row
                });

              });

            } else {
              console.log('Please enter season');
            }

          }
          break;

        default:
          console.log('Please enter a chart_name');

      }

    }

  });

} else {
  console.log('For build diagram, please enter parameters');
}
