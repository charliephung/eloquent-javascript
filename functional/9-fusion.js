const add1 = x => x + 1;
const mul2 = x => x * 2;
const pow2 = x => x * x;

let list = [1, 3, 4, 5, 6];

// list
//   .map(add1)
//   .map(mul2)
//   .map(div3);

//   When Functions have the same shape
// ==> fusion is take a list of operations and compose in to 1

const pipeTwo = (fn1, fn2) => (...args) => fn2(fn1(...args));

let res = list.map([add1, mul2, pow2].reduce(pipeTwo));
console.log(res);
