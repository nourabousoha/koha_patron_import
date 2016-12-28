const parse = require('csv-parse');
const fs = require("fs");

const FILE_NAME = 'usagers.csv'
let input = fs.readFileSync(FILE_NAME);

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
let transform = function (err, output) {
  output[0].push("patron_attributes");
  output[0].push("categorycode");
  output[0].push("branchcode");
  for (let i = 1; i < output.length; i++) {
    output[i].push('"FONC:' + output[i][6] + ',DISC:' + output[i][8] + ',ORG:' + output[i][9] + ',CODE:' + output[i][12]+'"');
    output[i].push("ADULT");
    output[i].push(themeCode(output[i][7]));
  }
  //console.log(output.join('\n'));
  fs.writeFile('usagers_transformed.csv', output.join('\n'),  function(err) {
   if (err) {
      return console.error(err);
  }});
}
parse(input, transform);

