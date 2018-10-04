const Sqlite = require('sqlite3').verbose();

const db = new Sqlite.Database('./data/olympic_history.db', Sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message)
  else console.log('Connected to the olympic_history database.');
})

exports.writeToBaseValues = (options) => {

  const data = options.data;
  const query = `INSERT or REPLACE INTO ${options.table} (${Object.keys(data)})`;

  let values = ['VALUES(', ')'],
    index = 1;

  for (let key in data) {
    let value;

    if (Object.keys(data).length != Object.keys(data).indexOf(key) + 1) {
      value = `"${data[key]}",`
    } else {
      value = `"${data[key]}"`
    }

    values.splice(index, 0, value)

    index++

  }

  db.run(query + values.join(''))

}

exports.writeToBaseSelect = (options) => {
  const data = options.data
  const query = `INSERT or REPLACE INTO ${options.table} (${Object.keys(data)})`

  let values = ['SELECT', ''],
    index = 1

  for (let key in data) {
    let value;
    if (Object.keys(data).length != Object.keys(data).indexOf(key) + 1) {
      value = `"${data[key]}",`;
    } else {
      value = ` teams.id FROM teams WHERE teams.noc_name = "${data[key]}"`;
    }
    values.splice(index, 0, value)

    index++

  }
  db.run(query + values.join(''))

}

exports.buildResultTable = (options) => {

  const data = options.data;
  const wheredata = options.where;
  const insert = `INSERT or REPLACE INTO ${options.table} (${Object.keys(data)})`;
  const from = `FROM ${options.from}`;

  let index = 1,
    select = [' SELECT ', ''],
    where = [' WHERE ', '']

  for (let key in data) {

    if (Object.keys(data).length != Object.keys(data).indexOf(key) + 1) {
      value = `  ${data[key]},`;
    } else {
      value = ` "${data[key]}" `;
    }
    select.splice(index, 0, value)

    index++

  }

  for (let key in wheredata) {

    if (Object.keys(wheredata).length != Object.keys(wheredata).indexOf(key) + 1) {
      value = `${key} = "${wheredata[key]}" AND `
    } else {
      value = `${key} = "${wheredata[key]}" LIMIT 1`
    }

    where.splice(index, 0, value)
  }
  db.run(insert + select.join('') + from + where.join(''))

}
