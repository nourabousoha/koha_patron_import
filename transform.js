const fs = require("fs");
const Promis = require('bluebird');

Promis.promisifyAll(fs);
const indFonc = 6;
const indDisc = 8;
const indOrg = 9;
const indCode = 12;
const indTheme = 7;

let themeCode = function (theme) {
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
let allQuoted = function (myArray) {
    for (let i = 1; i < myArray.length; i++) {
        for (let j = 0; j < myArray[0].length; j++) {
            myArray[i][j] = '"' + myArray[i][j] + '"';
        }
    }
    return myArray;

}
let change = function(dataArray){
    
    dataArray[0].push("patron_attributes");
    dataArray[0].push("categorycode");
    dataArray[0].push("branchcode");
    for (let i = 1; i < dataArray.length; i++) {
        dataArray[i].push('FONC:' + dataArray[i][indFonc] + ',DISC:' + dataArray[i][indDisc] + ',ORG:' + dataArray[i][indOrg] + ',CODE:' + dataArray[i][indCode]);
        dataArray[i].push("ADULT");
        dataArray[i].push(themeCode(dataArray[i][indTheme]));
  
}}
let transform = function (outputFile) {
    return function(err, output){
    change(output);

    fs.writeFileAsync(outputFile,allQuoted(output).join('\n') ).catch( function (err) { //allQuoted(output).join('\n')
                   return console.error(err);
       
    });
    }
}

module.exports = transform;