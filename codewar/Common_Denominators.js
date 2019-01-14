function convertFrac(lst){
  //Your code here
  if(lst.length === 0) return "";
  var mul = lst.map(e => e[1]).reduce(findMinDiv);
  return lst.map(e => `(${e[0] * (mul / e[1])},${mul})`).join("");
}
function findMinDiv(a ,b) {
  var mul = a * b;
  while(a !== b) {
    if(a>b) a = a - b;
    else b = b - a;
  } 
  return mul / a;
}
