const args = process.argv.slice(2);

if (args.length) {
  create:require('./test').create;
} else {
  create:require('./base').create;
}
