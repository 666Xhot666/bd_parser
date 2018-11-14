// result-table-insert
const insertTable = (data, db) => new Promise(((resolve) => {
  this.query = 'INSERT INTO results(athlete_id,game_id,sport_id,event_id,medal) VALUES($athlete_id,$game_id,$sport_id,$event_id,$medal)';
  db.serialize(() => {
    db.all('BEGIN', () => {
      db.serialize(() => {
        db.run(`DELETE FROM results`)
          .run('DELETE FROM sqlite_sequence WHERE name="results"')
          .run('PRAGMA synchronous = 0')
          .run('PRAGMA journal_mode = MEMORY')
      })
    }).all('COMMIT', () => {}).all('BEGIN', () => {

      Object.values(data).forEach((row) => {
            db.run(this.query, {
              $athlete_id: row.id,
              $game_id: row.game,
              $sport_id: row.sport,
              $event_id: row.event,
              $medal: row.medal
            })
      });
    }).all('COMMIT', () => {
      resolve('Insert Results complete')
    })
  })
}))

module.exports = insertTable;

// exports.insertTable = (data,clear,callback) => {
//   Object.keys(data).forEach((row,id) => {
//     Object.keys(data[row].Games).forEach((values) => {
//       Object.keys(data[row].Games[values].Event).forEach((value) => {
//         clear.writeToBase({
//           table: 'results',
//           data: {
//             athlete_id: row,
//             game_id: values,
//             sport_id:data[row].Games[values].Sport,
//             event_id:value,
//             medal: data[row].Games[values].Event[value],
//           },
//         });
//       });
//     });
//     if(id+1 === Object.keys(data).length) callback();
//   });
// };
