const increment = a => a + 1;
const double = a => a * 2;

const compose = (...fns) => pipe(...fns.reverse());

const pipe = (...fns) => {
  const [fn1, fn2, ...rest] = fns;
  return typeof fn1 === "function"
    ? typeof fn2 === "function"
      ? pipe(
          x => fn2(fn1(x)),
          ...rest
        )
      : x => fn1(x)
    : x => fn1(x);
};

console.log(
  compose(
    increment,
    increment,
    double,
    double
  )(3) // 3 * 2 * 2 + 1 + 1
);
console.log(
  pipe(
    double,
    double,
    increment,
    increment
  )(3) // 3 * 2 * 2 + 1 + 1
);
