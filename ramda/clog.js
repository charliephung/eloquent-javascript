const R = require("ramda");

const { compose, prepend, apply, chain, pair } = R;

const tap = fn => x => (fn(x), x);

compose.clog = compose(
  apply(compose),
  prepend(tap(console.log)),
  chain(pair(tap(console.log))),
  Array
);

//=== Usage ===

// plus1 :: Number => Number
const plus1 = x => x + 1;

// getVal :: Number => Number
const getVal = compose.clog(plus1, plus1);

console.log(getVal(10));
