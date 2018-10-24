const args = process.argv.slice(2);

if (args.length) {
  create:require('./diagram').create;
} else {
  create:require('./base').create;
}
