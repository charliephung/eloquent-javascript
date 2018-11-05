Array.prototype.sameStructureAs = function (other) {
    return compare(this, other)
};

function compare (arr1, arr2) {
  if(!isArray(arr1) || !isArray(arr2)) return false;
  if(arr1.length != arr2.length) return false;
  for(let i = 0; i < arr1.length; i++) {
    if(isArray(arr1[i])) {
      if(!compare(arr1[i], arr2[i])) return false; 
    }
  }
  
  return true;
}
