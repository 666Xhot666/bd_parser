module.exports = function(options) {

  var title = options.title, data = options.data, newdata = [], sortdata = {}, param_value, k ;

  var Amount = (size) => {
    for (var i = 0, str = ''; i < size; i++) str += String.fromCharCode(0x258C)
    return str;
  }

  console.clear()
  console.log(title, 'Amount');

  for (var row in data) {
    param_value = data[row][Object.keys(data[row])[0]]
    newdata[param_value] = (newdata[param_value] === void 0) ? data[row].medal : newdata[param_value] + data[row].medal
  }

  newdata = Object.entries(newdata).sort(function (a, b) {
    return b[1] - a[1];
  })
  
     k = (newdata[1][0].length == 3) ? 200 / newdata[1][1] : 1;
  for (var key in newdata) {
    console.log(newdata[key][0], Amount(newdata[key][1] * k));
  }

}
