module.exports = function (title, data, chart) {
  const str = String.fromCharCode(0x258C);

  let consolData = [];

  let сoeff = 1;

  data.forEach((row) => {
    const param = row[Object.keys(row)[0]];
    if (!consolData[param]) {
      consolData[param] = row.medal;
    } else {
      consolData[param] += row.medal;
    }
  });
  if (chart === 'medals') {
    consolData = Object.entries(consolData).sort((a, b) => (b[0] - a[0]));
  } else {
    consolData = Object.entries(consolData).sort((a, b) => (b[1] - a[1]));
    сoeff = 200 / consolData[0][1];
  }
  console.clear();
  console.log(title, 'Amount');

  consolData.forEach(Row => console.log(Row[0], str.repeat(Row[1] * сoeff)));
};
