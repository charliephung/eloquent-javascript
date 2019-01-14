// must in strict mode
"use strict";

const sum = (sum, num, ...rest) => {
  sum += num;
  if (rest.length == 0) return sum;
  // Now stack frames dont have to keep track of current sum
  // since we pass it along with the function call
  //   before is sum + sum(num, ...rest)
  return sum(sum, ...rest);
};
