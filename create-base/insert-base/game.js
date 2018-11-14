// game-table-insert
const insertTable = (data, db) => new Promise (((resolve)=>{
  this.query = `INSERT INTO games(id,year,season,city) VALUES($id,$year,$season,$city)`;
  db.serialize(() => {
    db.all('BEGIN', () => {
      db.serialize(() => {
        db.run(`DELETE FROM games`)
          .run('DELETE FROM sqlite_sequence WHERE name="games"')
          .run('PRAGMA synchronous = 0')
          .run('PRAGMA journal_mode = MEMORY')
      })
    }).all('COMMIT', () => {}).all('BEGIN', () => {
      Object.keys(data).forEach((row) => {
        db.run(this.query, {
          $id: data[row].id,
          $year: data[row].Year,
          $season: data[row].Season,
          $city: `${data[row].City}`,
        })
      })
    }).all('COMMIT', () => {
      resolve('Insert Games complete')
    })
  })

}))

module.exports = insertTable;

// exports.insertTable = (data, clear) => {
//   Object.keys(data).forEach((row, id) => {
//     clear.writeToBase({
//       table: 'games',
//       data: {
//         id: data[row].id,
//         year: data[row].Year,
//         season: data[row].Season,
//         city: data[row].City,
//       },
//     });
//   });
// };
