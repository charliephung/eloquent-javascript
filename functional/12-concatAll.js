Array.prototype.concatAll = function() {
  var res = [];
  this.forEach(subArr => res.push(...subArr));
  return res;
};
