const args = process.argv.slice(2);

const Diagram = require('./diagram');
const createBase = require('./create-base');
const startTime = Date.now();

if (args.length) {
  new Diagram(args[0],args.slice(1))
} else {
  console.log('Build database is started');
  createBase().then(()=>{
    console.log('Finish');
  })
}
