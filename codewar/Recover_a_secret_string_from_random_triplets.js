var recoverSecret = function(triplets) {
  var res = "";
  var duplets = tripletsToDuplets();
  
  do {
    var char = findChar(duplets);
    if(duplets.length == 1) {
      res += duplets[0];
      duplets = duplets.filter(e => e[0] != char);
    } else {
      duplets = duplets.filter(e => e[0] != char);
      res += char;
    }
  } while (duplets.length > 0)
  
  return res;
  
  function tripletsToDuplets() {
    return triplets.reduce((arr, el) => {
      var d1 =  `${el[0]}${el[1]}`
      var d2 =  `${el[1]}${el[2]}`
      
      if(arr.indexOf(d1) == -1) arr.push(d1);
      if(arr.indexOf(d2) == -1) arr.push(d2);
      
      return arr;
    }, [])
  
  }
  
  function findChar(duplets) {
    // next char is the char that appear col[0] of a duplet and doesnt appear in second col of any duplets
    var firstChars = duplets.map(e => e[0]);
    var secondChars = duplets.map(e => e[1]);
    
    return firstChars.find(e => secondChars.indexOf(e) == -1);
  }
}
