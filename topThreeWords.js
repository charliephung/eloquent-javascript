function topThreeWords(text) {
  var dict = {};
  text.split(" ").map(e => e.toLowerCase().replace("//", "")).filter(isChar).forEach(loadChar)
  return Object.keys(dict).sort((a,b) => dict[b].amount - dict[a].amount).slice(0, 3);
  
  
  function removeSpecialChar(e) { return e.replace(/[^\w\s]/gi, '') }
  function isChar(c) { return  /\w/.test(c) }
  function loadChar(e) { 
      if(dict[e] == undefined) {
         dict[e] = {}; 
         dict[e].amount = 1;
      }
      else dict[e].amount++ 
  }
}
