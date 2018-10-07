module.exports = function (options) {
  const str = String.fromCharCode(0x258C);

  let data = [];


  let сoeff = 1;

  for (const row in options.data) {
    const param = options.data[row][Object.keys(options.data[row])[0]];
    if (!data[param]) {
      data[param] = options.data[row].medal;
    } else {
      data[param] += options.data[row].medal;
    }
  }

  data = Object.entries(data).sort((a, b) => (b[1] - a[1]));

  if (data[1][0].length === 3) сoeff = 200 / data[1][1];

  console.clear();
  console.log(options.title, 'Amount');

  data.forEach(Row => console.log(Row[0], str.repeat(Row[1] * сoeff)));
};
