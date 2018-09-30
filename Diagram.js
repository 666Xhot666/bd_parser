module.exports = function(options) {

  let data = [],
    сoefficient = 1,
    str = String.fromCharCode(0x258C),
    param;

  console.clear()
  console.log(options.title, 'Amount');

  for (var row in options.data) {
    param = options.data[row][Object.keys(options.data[row])[0]]
    data[param] = (data[param] === undefined) ? options.data[row].medal : data[param] + options.data[row].medal
  }

  data = Object.entries(data).sort(function(a, b) {
    return b[1] - a[1];
  })

  if (data[1][0].length === 3) сoefficient = 200 / data[1][1];
  for (var key in data) {
    console.log(data[key][0], str.repeat(data[key][1] * сoefficient));
  }

}
