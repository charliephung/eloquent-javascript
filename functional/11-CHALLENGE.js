// ************************************
// UTILITIES
// ************************************
const curry = (fn, p = fn.length) =>
  (curried = prevArg => nextArg => {
    let args = prevArg.concat(nextArg);
    if (args.length >= p) {
      return fn(...args);
    } else {
      return curried(args);
    }
  })([]);
const compose = (...fns) => pipe(...fns.reverse());
const pipe = (...fns) =>
  fns.reduce((fn1, fn2) => (...args) => fn2(fn1(...args)));
const binary = fn => (arg1, arg2) => fn(arg1, arg2);

const isOdd = v => v % 2 == 1;
const sum = (x, y) => x + y;
const mult = (x, y) => x * y;
const listSum = list => list.reduce(sum, 0);
const listProduct = list => list.reduce(mult, 1);

const mapObj = (mapperFn, o) => {
  var newObj = {};
  var keys = Object.keys(o);
  for (let key of keys) newObj[key] = mapperFn(o[key]);
  return newObj;
};

const filterObj = (predicateFn, o) => {
  var newObj = {};
  var keys = Object.keys(o);
  for (let key of keys) if (predicateFn(o[key])) newObj[key] = o[key];
  return newObj;
};

const reduceObj = (reducerFn, initialValue, o) => {
  var res = initialValue;
  var keys = Object.keys(o);
  for (let key of keys) res = reducerFn(res, o[key]);
  return res;
};

// *************************************
// CHALLENGE
// Filter out the field which sum of it's value is an odd number
// Then multipy all values in 1 field
// return sum of multipied values
// ************************************

var nums = {
  first: [3, 5, 2, 4, 9, 1, 12, 3],
  second: [5, 7, 7, 9, 10, 4, 2],
  third: [1, 1, 3, 2]
};

[
  curry(filterObj)(
    pipe(
      listSum,
      isOdd
    )
  ),
  curry(mapObj)(listProduct),
  curry(reduceObj)(sum)(0)
  // Since reduce pass in item index and the arr
  // but pipe take n inputs and expect them to be functions
  // => use binary to rescrict only 2 input which is
  // the first function and the next one
].reduce(binary(pipe))(nums);

// 38886
