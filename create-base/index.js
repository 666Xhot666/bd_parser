const analize = require('./analize');
const basic = require('./basic-value');
const insert = require('./insert-base');

const startTime = Date.now();

const createBase = finish => new Promise(((resolve) => {
  analize(basic.treatment).then((data) => {
    console.log('Parsing CSV succeaful',(Date.now() - startTime)/1000);
    insert(data, basic.db, startTime)
  });
}));

module.exports = createBase;
