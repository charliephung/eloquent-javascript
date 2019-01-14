const add1 = x => x + 1;
const isOdd = x => x % 2 != 0;
const sum = (x, y) => x + y;

let list = [1, 3, 4, 5, 6];

// Transduce is compose funcions that have different shape
/*
list
  .map(add1)
  .filter(isOdd)
  .reduce(sum);
*/

/**
 * Step1: transform map and filter to reduce
 */
const mapWithReduce = (arr, fn) =>
  arr.reduce((list, item) => list.push(fn(item)), []);
const filterWithReduce = (arr, fn) =>
  arr.reduce((list, item) => (fn(item) ? list.push(item) : list), []);
//   now we have 3 new funcs
list = mapWithReduce(list, add1);
list = filterWithReduce(list, isOdd);
list.reduce(sum);
/**
 * Step2: extract reducers on line 17 and line 19 out
 */
const mapReducer = fn => (list, item) => list.push(fn(item));
const filterReducer = fn => (list, item) => (fn(item) ? list.push(item) : list);
// new we have 3 reduce
list
  .reduce(mapReducer(add1), [])
  .reduce(filterReducer(isOdd), [])
  .reduce(sum);
/**
 * Step3: find common operator between mapReducer and filterReducer
 * => split list.push
 */
const listOperator = (list, item) => list.push(item);
const mapReducer = (fn, listOperator) => (list, item) =>
  listOperator(list, fn(item));
const filterReducer = (fn, listOperator) => (list, item) =>
  fn(item) ? listOperator(list, fn(item)) : list;
/**
 * Step4: Since mapReducer and filterReducer both have same listOperator
 * => curry them to a function that expect a listOperator as an input
 * => pipe them in to 1 function
 */
// curry and pipe
const curry = fn => fn1 => fn2 => fn(fn1, fn2);
const pipeTwo = (fn1, fn2) => (...args) => fn2(fn1(...args));
const curriedMapReducer = curry(mapReducer);
const curriedFilterReducer = curry(filterReducer);
// since now curriedMapReducer(add1) and curriedFilterReducer(isOdd) both expect same input
list
  .reduce(
    pipeTwo(curriedFilterReducer(add1), curriedFilterReducer(isOdd))(
      listOperator
    ),
    []
  )
  .reduce(sum);
// Since the final output is a sum of all list
// => change init value and operator
list.reduce(
  pipeTwo(curriedFilterReducer(add1), curriedFilterReducer(isOdd))(sum),
  0
);
list.reduce(
  pipeTwo(curry(mapReducer)(add1), curry(filterReducer)(isOdd))(sum),
  0
);

/**
 *  Final
 *  phew!
 */
const add1 = x => x + 1;
const isOdd = x => x % 2 != 0;
const sum = (x, y) => x + y;

let list = [1, 2, 3, 5, 6, 7];

const curry = fn => fn1 => fn2 => fn(fn1, fn2);
const pipe = (...fns) =>
  fns.reduce((fn1, fn2) => (...args) => fn2(fn1(...args)));

const mapReducer = curry((fn, op) => (obj, i) => op(obj, fn(i)));
const filterReducer = curry((fn, op) => (obj, i) => (fn(i) ? op(obj, i) : obj));

const transducer = pipe(
  mapReducer(add1),
  mapReducer(add1),
  filterReducer(isOdd)
);

list.reduce(transducer(sum), 0);

// tranduce function
const transduce = (transducers, operator, init, obj) =>
  obj.reduce(transducers(operator), init);
const pipe = (...fns) =>
  fns.reduce((fn1, fn2) => (...args) => fn2(fn1(...args)));

transduce(
  pipe(
    mapReducer(add1),
    filterReducer(isOdd)
  ),
  sum,
  0,
  list
);
