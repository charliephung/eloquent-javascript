const increment = a => a + 1;
const double = a => a * 2;

const compose = (...fns) => pipe(...fns.reverse());

const pipe = (...fns) => {
  const [fn1, fn2, ...rest] = fns;
  if (typeof fn1 === "function") {
    if (typeof fn2 === "function") {
      return pipe(
        x => fn2(fn1(x)),
        ...rest
      );
    } else {
      return x => fn1(x);
    }
  }
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
