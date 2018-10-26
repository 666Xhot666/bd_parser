"use strict";

const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./storage/olympic_history.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to the olympic_history database.');
});

const constructQuery = function (data, part, valueA, valueB) {
  let value;
  Object.entries(data).forEach((row, index) => {
    if (Object.keys(data).length !== Object.keys(data).indexOf(row[0]) + 1) {
      value = valueA(row[0], row[1]);
    } else {
      value = valueB(row[0], row[1]);
    }
    part.splice(index + 1, 0, value);
  });
  return part;
};

const baseQuery = {
  writeToBase: (options) => {
    const data = options.data;
    const query = `INSERT INTO ${options.table} (${Object.keys(data)})`;
    let values = ['VALUES(', ')'];
    values = constructQuery(data, values,
      (key, valueKey) => `"${valueKey}",`,
      (key, valueKey) => `"${valueKey}"`);
    db.run(query + values.join(''));
  },

  searchData: (query, callback) => {
    db.all(query, (err, row) => callback(row));
  },

  clearBase: result => new Promise(((resolve) => {
    db.serialize(() => {
      db.all('BEGIN', () => {
        db.serialize(() => {
          db.run('DELETE FROM \'athletes\'')
            .run('DELETE FROM \'teams\'')
            .run('DELETE FROM \'games\'')
            .run('DELETE FROM \'results\'')
            .run('DELETE FROM \'sports\'')
            .run('DELETE FROM \'events\'')
            .run('PRAGMA synchronous = 0')
            .run('PRAGMA journal_mode = MEMORY')
            .run('UPDATE sqlite_sequence SET seq=0');
        });
      }).all('COMMIT', () => resolve(result));
    });
  })),
};

module.exports = baseQuery;
