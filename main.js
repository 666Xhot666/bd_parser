const args = process.argv.slice(2);
if (args.length) {
  require('./diagram');
} else {
  require('./base');
  console.log('Start insert data into base');
}
