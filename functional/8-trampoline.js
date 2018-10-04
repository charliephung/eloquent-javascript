//  ????????????????
const trampoline = fn => {
  return (...args) => {
    let res = fn(...args);
    console.log(res);

    while (typeof res == "function") {
      res = res();
    }

    return res;
  };
};

const sumTrampolined = trampoline(function f(sum, num, ...nums) {
  sum += num;
  if (nums.length == 0) return sum;
  return () => f(sum, ...nums);
});

console.log(sumTrampolined(1, 2, 3));
