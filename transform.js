const parse = require('csv-parse');
const  fs = require("fs");

const FILE_NAME ='usagers2.csv'
let input = fs.readFileSync(FILE_NAME);

let transform = function(err, output){
  output[0].push("patron_attributes");
  output[0].push("categorycode");
  for (let i=1;i<output.length; i++ ) {
  output[i].push('FONC:'+ output[i][6] + ',DISC:'+ output[i][8] + ',ORG:' + output[i][9] +'CODE:' + output[i][12] );
  output[i].push("ADULT");
  }
 console.log(output.join('\n'));
}
  parse(input,transform);

