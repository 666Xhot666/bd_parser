// spots-table-insert

const insertTable = (data, db) => new Promise(((resolve) => {
  this.query = 'INSERT INTO sports(id,name) VALUES($id,$name)';
  db.serialize(() => {
    db.all('BEGIN', () => {
      db.serialize(() => {
        db.run(`DELETE FROM sports`)
          .run('DELETE FROM sqlite_sequence WHERE name="sports"')
          .run('PRAGMA synchronous = 0')
          .run('PRAGMA journal_mode = MEMORY')
      })
    }).all('COMMIT', () => {}).all('BEGIN', () => {
      Object.keys(data).forEach((row) => {
        db.run(this.query, {
          $id: data[row].id,
          $name: row
        })
      })
    }).all('COMMIT', () => {
      resolve('Insert Sports complete');
    })
  })
}))


module.exports = insertTable;
// exports.insertTable = (data, clear) => {
//   Object.keys(data).forEach((row, id) => {
//     clear.writeToBase({
//       table: 'sports',
//       data: {
//         id: data[row].id,
//         name:row,
//       },
//     });
//   });
// };
