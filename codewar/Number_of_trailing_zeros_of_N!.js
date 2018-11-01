function isDivBy(n) {
    return function f(m) {
      return m % n === 0;
    }
  }
  
function countDivBy(i, j) {
    if(j === 0) return 0;
    var count = 0;
    while(isDivBy(i)(j)) {
      j /= i;
      count++;
    }
    return count;
}
function zeros (n) {
  var two = 0;
  var five = 0;
  var cache = {};
  
  if(cache[n] !== undefined) return cache[n];
  
  for(let index = n; index > 0; index--) {
    if(isDivBy(2)(index)) {
      two += countDivBy(2, index);
    }
    if(isDivBy(5)(index)) {
      five += countDivBy(5, index);
      }
  }
  
  cache[n] = two > five ? five : two;
  
  return cache[n];
}


