const parse = require('csv-parse');
const fs = require("fs");
const colors = require('colors');
// node-getopt oneline example.
const getopt = require('node-getopt').create([
  ['S' , 'in=ARG'  , 'Fichiers à traiter'],
  ['S' , 'out=ARG'  , 'Fichier de sortie'],
  ['h' , 'help'                , 'display this help'],
  ['v' , 'version'             , 'show version']
]);              // create Getopt instance
     // bind option 'help' to default action
getopt.setHelp(
  "Usage: node transform.js --in 'input file name --out 'output file name ' ".blue );
getopt.bindHelp();
let opt =getopt.parseSystem(); // parse command line
const indFonc = 6;
const indDisc = 8;
const indOrg = 9;
const indCode =12;
const indTheme =7;
let data;
let inputFile = opt.options.in;
let outputFile = opt.options.out ;
if (undefined === inputFile  | outputFile === undefined ){
getopt.showHelp();
process.exit();
}
else{
  try {
data = fs.readFileSync(inputFile,'utf8');

} catch(err) {
console.log(colors.red('Le fichier  ' + inputFile + ' n\'existe pas ' + err ));
process.exit();
}
  
}

var themeCode = function (theme) {
  if (theme === 'Sciences médicales et pharmaceutiques') {
    return 'SMP'
  }
  else if (theme === 'Sciences juridiques économiques et de gestion') {
    return 'SJEG'
  }
  else if (theme === "Sciences de l'ingénieur") {
    return 'SDI'
  }
  else if (theme === 'Sciences exactes et naturelles') {
    return 'SEN'
  }
  else if (theme === 'Lettres et sciences humaines') {
    return 'LSHS'
  }
}
let allQuoted = function(myArray){
  for (let i=1;i<myArray.length;i++) {
    for(let j=0;j < myArray[0].length;j++){
      myArray[i][j] = '"' + myArray[i][j] + '"';
    }
  }
  return myArray;

}
//console.log(allQuoted([['a','b,d','c'],[3,'c','d'],['o','l','f']]));
//console.log([['a','b,d','c'],[3,'c','d'],['o','l','f']]);
let transform = function (err, output) {
  output[0].push("patron_attributes");
  output[0].push("categorycode");
  output[0].push("branchcode");
  for (let i = 1; i < output.length; i++) {
    output[i].push('FONC:' + output[i][indFonc] + ',DISC:' + output[i][indDisc] + ',ORG:' + output[i][indOrg] + ',CODE:' + output[i][indCode]);
    output[i].push("ADULT");
    output[i].push(themeCode(output[i][indTheme]));
  }

 // console.log((allQuoted(output)).join('\n'));
//}
  fs.writeFile(outputFile,allQuoted(output).join('\n'),  function(err) {
   if (err) {
      return console.error(err);
  }else{
    console.log(colors.green('fichier transformé et enrgisté en ' + outputFile));
  }
});
}

parse(data, transform);

