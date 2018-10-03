// Solution for call mutilple recursion ?????
// I CANNOT UNDERSTAND THIS :)))
const sumRecur = (...nums) => {
  return () => (...nums) => {
    return recur(nums, v => v);
  };

  const recur = ([sum, ...nums], cont) => {
    if (nums.length === 0) return cont(sum);
    return recur(nums, v => cont(sum + v));
  };
};
//    sum | nums      , v => v
//params    1 | 2 3 4 5 6 , v => 1 + v;
//nextRec   recur(nums, v1 => cont(sum + v1));  (cont === v => 1 + v)
//params    2 | 3 4 5 6 , v1 => 1 + 2 + v1;
//nextRec   recur(nums, v2 => cont(sum + v2));  (cont === v1 => 1 + 2 + v1)
//params    3 | 4 5 6 , v2 => 1 + 2 + 3 + v2;
// .......
