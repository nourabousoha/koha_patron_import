const parse = require('csv-parse');
const fs = require("fs");
const colors = require('colors');
const transformed = require('./transform');
const Promis = require('bluebird');
// node-getopt oneline example.
const getopt = require('node-getopt').create([
  ['S', 'in=ARG', 'Fichier à traiter'],
  ['S', 'out=ARG', 'Fichier de sortie'],
  ['h', 'help', 'display this help'],
  ['v', 'version', 'show version']
]);              // create Getopt instance
// Promisification of all fs functions
Promis.promisifyAll(fs);
// bind option 'help' to default action
getopt.setHelp(
  "Usage: node transform.js --in 'input file name --out 'output file name ' ".blue);
getopt.bindHelp();
let opt = getopt.parseSystem(); // parse command line

let data;
let inputFile = opt.options.in;
let outputFile = opt.options.out;
let transform;
if (undefined === inputFile | outputFile === undefined) {
  getopt.showHelp();
  process.exit();
}
else {
  try {
    data = fs.readFileAsync(inputFile, 'utf8')
      .then(data)
      .catch(
      // Log the rejection reason
      function (reason) {
        console.log('Handle rejected promise (' + reason + ') here.');
      });
    transform = transformed(outputFile);

  } catch (err) {
    console.log(colors.red('Le fichier  ' + inputFile + ' n\'existe pas ' + err));
    process.exit();
  }
}

parse(data, transform);

