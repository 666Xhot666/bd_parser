`use strict`
exports.topteams = (data) => {
  const str = String.fromCharCode(0x258C);
  const medal = 'COUNT(results.medal)'
  const coef = 200 / data[0][medal];
  console.clear();
  console.log('Team', 'Amount');
  Object.values(data).forEach(row => {
    console.log(row['noc_name'], (row[medal] * coef > 1) ? str.repeat(row[medal] * coef) : str);
  })
};

exports.medals = (data) =>{
  const str = String.fromCharCode(0x258C);
  const medal = 'COUNT(results.medal)'
  console.clear();
  console.log('Year', 'Amount');
  Object.values(data).forEach(row => {
    console.log(row['year'],str.repeat(row[medal]));
  })
}
