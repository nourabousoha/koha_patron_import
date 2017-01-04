const fs = require("fs");
const Promis = require('bluebird');

Promis.promisifyAll(fs);
const indFonc = 6;
const indDisc = 8;
const indOrg = 9;
const indCode = 12;
const indTheme = 7;
// test some git problems
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
let transform = function (outputFile) {
    return function(err, output){
    output[0].push("patron_attributes");
    output[0].push("categorycode");
    output[0].push("branchcode");
    for (let i = 1; i < output.length; i++) {
        output[i].push('FONC:' + output[i][indFonc] + ',DISC:' + output[i][indDisc] + ',ORG:' + output[i][indOrg] + ',CODE:' + output[i][indCode]);
        output[i].push("ADULT");
        output[i].push(themeCode(output[i][indTheme]));
    }


    fs.writeFileAsync(outputFile, allQuoted(output).join('\n')).catch( function (err) {
                   return console.error(err);
       
    });
    }
}

module.exports = transform;