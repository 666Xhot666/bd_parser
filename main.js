const args = process.argv.slice(2);

const Diagram = require('./diagram');

if (args.length) {
  new Diagram(args[0],args.slice(1))
} else {
  require('./create-base');
}
