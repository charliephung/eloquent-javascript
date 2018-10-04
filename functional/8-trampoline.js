//  ????????????????
const trampoline = fn => {
  return (...args) => {
    let res = fn(...args);

    while (typeof res == "function") {
      res = res();
    }

    return res;
  };
};

const sumTrampolined = trampoline(function f(sum, num, ...nums) {
  sum += num;
  if (nums.length == 0) return sum;
  return () => f(sum, nums);
});

sumTrampolined(1, 2, 3, 4, 5);
