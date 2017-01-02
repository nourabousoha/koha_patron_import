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

module.exports ={
    themeCode : themeCode,
    allQuoted: allQuoted
}