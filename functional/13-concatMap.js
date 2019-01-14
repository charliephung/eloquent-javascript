Array.prototype.concatMap = function(FnThatReturnArray) {
  return this.map(item => FnThatReturnArray(item)).concatAll();
};
