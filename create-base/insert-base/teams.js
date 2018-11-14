// team-table-insert
const insertTable = (data, db) => new Promise (((resolve)=>{
  this.query = 'INSERT INTO teams(id,noc_name,name) VALUES($id,$noc_name,$name)';
  db.serialize(() => {
    db.all('BEGIN', () => {
      db.serialize(() => {
        db.run(`DELETE FROM teams`)
          .run('DELETE FROM sqlite_sequence WHERE name="teams"')
          .run('PRAGMA synchronous = 0')
          .run('PRAGMA journal_mode = MEMORY')
      })
    }).all('COMMIT', () => {}).all('BEGIN', () => {
      Object.keys(data).forEach((row) => {
        db.run(this.query, {
          $id: data[row].id,
          $noc_name: row,
          $name: data[row].team
        })
      })
    }).all('COMMIT', () => {
      resolve('Insert Teams complete')
    })
  })

}))

module.exports = insertTable;
// exports.insertTable = (data, clear) => {
//   Object.keys(data).forEach((row, id) => {
//     clear.writeToBase({
//       table: 'teams',
//       data: {
//         id: data[row].id,
//         noc_name: row,
//         name: data[row].team,
//       },
//     });
//   });
// };
