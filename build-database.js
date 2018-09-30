const Sqlite = require('sqlite3').verbose();

const db = new Sqlite.Database('./data/olympic_history.db', Sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message)
  else console.log('Connected to the olympic_history database.');
})

exports.writeToBaseValues = (options) => {

  let data = options.data,
    index = 1

  let query = "INSERT or REPLACE INTO " + options.table + '(' + Object.keys(data) + ') ',
    values = ['VALUES(', ')']

  for (let key in data) {

    let value = (Object.keys(data).length != Object.keys(data).indexOf(key) + 1) ?
      '"' + data[key] + '",' :
      '"' + data[key] + '"'

    values.splice(index, 0, value)

    index++

  }

  db.run(query + values.join(''))

}

exports.writeToBaseSelect = (options) => {
  let data = options.data,
    index = 1

  let query = "INSERT or REPLACE INTO " + options.table + '(' + Object.keys(data) + ') ',
    values = ['SELECT', '']

  for (let key in data) {
    let value = (Object.keys(data).length != Object.keys(data).indexOf(key) + 1) ?
      '"' + data[key] + '",' :
      ' teams.id FROM teams WHERE teams.noc_name = "' + data[key] + '"'

    values.splice(index, 0, value)

    index++

  }
  db.run(query + values.join(''))

}

exports.buildResultTable = (options) => {

  let data = options.data,
    wheredata = options.where,
    index = 1

  let insert = "INSERT or REPLACE INTO " + options.table + '(' + Object.keys(data) + ') ',
    select = ['SELECT ', ''],
    from = ' FROM ' + options.from,
    where = [' WHERE ', '']

  for (let key in data) {

    let value = (Object.keys(data).length != Object.keys(data).indexOf(key) + 1) ?
      '' + data[key] + ',' :
      '"' + data[key] + '"';

    select.splice(index, 0, value)

    index++

  }

  for (let key in wheredata) {

    let value = (Object.keys(wheredata).length != Object.keys(wheredata).indexOf(key) + 1) ?
      '' + key + ' = "' + wheredata[key] + '" AND ' :
      '' + key + '= "' + wheredata[key] + '" LIMIT 1';

    where.splice(index, 0, value)
  }

  db.run(insert + select.join('') + from + where.join(''))

}
