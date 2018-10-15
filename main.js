const args = process.argv.slice(2);
if (args.length) {
  require('./build-diagram');
} else {
  require('./build-base');
  console.log('Start insert data into base');
}
