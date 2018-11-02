function listSquared(m, n) {
    var arr = Array.from({length: n - m}, (j,i) => i + m);
    return arr.reduce((arr, i) => {
      var divSum = findDivisors(i).map(sqrt).reduce(sum)
      if(isSquare(divSum)) {
        arr.push([i, divSum]);
      }
      return arr;
      
    },[])
    
    
}

function isSquare(n) {
  return n > 0 && Math.sqrt(n) % 1 === 0;
};
function sum(n, m) {
  return n + m;
}
    
function sqrt (n) {
  return n * n;
}

function findDivisors(n) {
  var divisors = [];
  var index = 1;
  if(n == 1) return [1];
  while (divisors.indexOf(index) === -1) {
      if(n % index === 0) { 
        divisors.push(n / index);
        if(n / index !== index)
          divisors.push(index);
      }
      index++;
  }
  return divisors;
}

