function productFib(prod){
  var fibs = {};
  function fib(n) {
    if(n === 0) return 0;
    if(n === 1) return 1;
    if(fibs[n])
      return fibs[n];
      
    fibs[n] = fib(n - 1) + fib(n - 2);
    return fibs[n];
  }
  
  var prodFib = 0;
  var i = -1 , j = 0;
  while(prodFib < prod) {
    prodFib = fib(++i) * fib(++j);
  }
  return [fibs[i],fibs[j],  prodFib === prod] 
}
