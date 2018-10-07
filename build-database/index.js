const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('../bd_parser/Data/olympic_history.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to the olympic_history database.');
});

const constructQuery = function (data, part, valueA, valueB) {
  let index = 1;
  let value;
  Object.entries(data).forEach((row) => {
    if (Object.keys(data).length !== Object.keys(data).indexOf(row[0]) + 1) {
      value = valueA(row[0], row[1]);
    } else {
      value = valueB(row[0], row[1]);
    }
    part.splice(index, 0, value);

    index++;
  });

  return part;
};

exports.writeToBaseValues = (options) => {
  const data = options.data;
  const query = `INSERT or REPLACE INTO ${options.table} (${Object.keys(data)})`;

  let values = ['VALUES(', ')'];

  values = constructQuery(data, values,
    (key, valueKey) => `"${valueKey}",`,
    (key, valueKey) => `"${valueKey}"`);

  db.run(query + values.join(''));
};

exports.writeToBaseSelect = (options) => {
  const data = options.data;
  const query = `INSERT or REPLACE INTO ${options.table} (${Object.keys(data)})`;

  let values = ['SELECT', ''];

  values = constructQuery(data, values,
    (key, valueKey) => `"${valueKey}",`,
    (key, valueKey) => ` teams.id FROM teams WHERE teams.noc_name = "${valueKey}"`);

  db.run(query + values.join(''));
};

exports.buildResultTable = (options) => {
  const data = options.data;
  const wheredata = options.where;
  const insert = `INSERT or REPLACE INTO ${options.table} (${Object.keys(data)})`;
  const from = `FROM ${options.from}`;

  let select = [' SELECT ', ''];


  let where = [' WHERE ', ''];

  select = constructQuery(data, select,
    (key, valueKey) => `${valueKey},`,
    (key, valueKey) => `"${valueKey}" `);

  where = constructQuery(wheredata, where,
    (key, valueKey) => `${key} = "${valueKey}" AND `,
    (key, valueKey) => `${key} = "${valueKey}" LIMIT 1 `);
  db.run(insert + select.join('') + from + where.join(''));
};
