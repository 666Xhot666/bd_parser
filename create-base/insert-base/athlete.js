const insertTable = (data, db) => new Promise (((resolve)=>{
  this.query = 'INSERT INTO athletes(id,full_name,age,sex,params,team_id) VALUES($id,$full_name,$age,$sex,$params,$team_id)';
  db.serialize(() => {
    db.all('BEGIN', () => {
      db.serialize(() => {
        db.run(`DELETE FROM athletes`)
          .run('DELETE FROM sqlite_sequence WHERE name="athletes"')
          .run('PRAGMA synchronous = 0')
          .run('PRAGMA journal_mode = MEMORY')
      })
    }).all('COMMIT', () => {}).all('BEGIN', () => {
      Object.values(data).forEach((row,id) => {
        db.run(this.query, {
          $id:id,
          $full_name:row.Name,
          $age:`${row.Age}`,
          $sex:row.Sex,
          $params:`${row.Param}`,
          $team_id:row.NOC,
        })

      })
    }).all('COMMIT', () => {
      resolve('Insert Athletes complete')
    })
  })

}))


module.exports = insertTable;


// exports.insertTable = (data,clear) => {
//   Object.keys(data).forEach((row, id) => {
//     if (row) {
//       clear.writeToBase({
//         table: 'athletes',
//         data: {
//           id: row,
//           full_name: data[row].Name,
//           sex: data[row].Sex,
//           age: data[row].Age,
//           params: data[row].Param,
//           team_id: data[row].NOC,
//         },
//       });
//     }
//   });
// };
