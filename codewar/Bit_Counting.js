var countBits = function(n) {
  let r = "";
  while (n !== 0) {
    if (n === 0) {
      r += "0";
    }
    if (n % 2 !== 0) {
      r += "1";
    } else {
      r += "0";
    }
    n = Math.floor(n / 2);
  }
  return (r.match(new RegExp("1", "g")) || []).length;
};
