function VigenèreCipher(key, abc) {
  var alpha = abc.split("")
  var k = key.split("").map(e => alpha.indexOf(e));
  
  this.encode = function (str) {
      var getKey = makeKey()
      return str.split("").map(c => 
          getCharCode(c) == -1 
          ? (getKey(), c)
          : abc[(getCharCode(c) + getKey()) % alpha.length]
      ).join("")
      
  };
  this.decode = function (str) {
      var getKey = makeKey()
      return str.split("").map(c => 
          getCharCode(c) == -1 
          ? (getKey(), c)
          : abc[(getCharCode(c) + alpha.length  - getKey()) % alpha.length]
      ).join("")
  };
  
  function getCharCode(c) {
    return alpha.indexOf(c);
  }
  
  function makeKey() {
      var currentIndex = -1;
      return function() { 
        currentIndex++;
        if(currentIndex > k.length - 1)
          currentIndex = 0;
        return k[currentIndex];
    }
  }
}
