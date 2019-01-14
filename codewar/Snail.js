// FIRST ATTEMPT
snail = function(array) {
// enjoy
  var edges = [];
  while(array.length >= 1) {
    edges.push(...listSquareArrayEdges(array));
    array = shrinkSquareArray(array);
  } 
  
  var arr = edges.reduce(joinEdges);
  if(edges[edges.length - 1].length == 2) {
    arr.splice(-1);
  }

  return arr;
}

function shrinkSquareArray(array) {
   var edges = array[0].length
   if(edges < 3) {
     return [];
   }
   var arr = [];
   for(let i = 1; i < edges - 1; i++) {
     let temp = [];
     for(let j = 1;  j < edges - 1; j++) {
       temp.push(array[i][j]);
     }
     arr.push(temp)
   }
   return arr || [];
}

function joinEdges(arr1, arr2) {
  return arr1.slice(0,-1).concat(arr2);
}

function listSquareArrayEdges(arr) {
  var array = [...arr];
  var edgesLength = array.length
  var lists = []
  if(edgesLength == 1) return array;
  
  lists.push([...array[0]]);
  {
    let temp = [];
    for(let i = 0; i < edgesLength; i++) {
      temp.push(array[i][edgesLength - 1])
    }
    lists.push(temp);
  }
   
  lists.push([...array[edgesLength - 1]]);
  {
    let temp = [];
    for(let i = 0; i < edgesLength; i++) {
      temp.push(array[i][0])
    }
    lists.push(temp);
  }
  
  lists[2].reverse();
  lists[3].reverse();
  
  return lists;
}





// Second :)))
snail = function(array) {
  // enjoy
  var res = []
  while(array.length > 1) {
    res.push(...array.shift());
    array.forEach(e => res.push(e.pop()));
    res.push(...array.pop().reverse());
    array.slice().reverse().forEach(e => res.push(e.shift()));
  }
    return res.concat(...array);
}






