function pathFinder(maze) {
  var mazeArr = maze.split("\n").map(row => row.split(""));
  var rows = mazeArr.length - 1;
  var cols = mazeArr[0].length - 1;
  var totalNodes = (rows + 1) * (cols + 1);
  var explored = {};

  var ExploreQueue = new PriorityQueue();
  var ExploreSet = new PairSet();
  ExploreQueue.enqueue([0, 0], score(0, 0));
  ExploreSet.add([0,0]);

  return find(0, 0);

  function find(x, y) {
    var currentNode = [x,y];
    var upNode = [x - 1, y];
    var downNode = [x + 1, y];
    var leftNode = [x, y - 1];
    var rightNode = [x, y + 1];

    if (x == rows && y == cols) return true;

    var tobeExploreNode = ExploreQueue.dequeue();
    
    if (!ExploreSet.has(currentNode)) ExploreSet.add(currentNode);
    [currentNode, upNode, downNode, leftNode, rightNode].forEach(node => {
        if (
        validPosition(...node) &&
        !ExploreSet.has(node) &&
        !ExploreQueue.isInQueue(node)
    ){
      ExploreQueue.enqueue(node, score(...node));
      }
    })
      
    
    if (ExploreQueue.getLength() == 0) return false;
   
    
    return find(...ExploreQueue.getFront()[0]);
  }

  function score(x, y) {
    return Math.sqrt(
      Math.pow(mazeArr[0].length - 1 - x, 2) +
        Math.pow(mazeArr.length - 1 - y, 2)
    ).toFixed(2);
  }
  function validPosition(x, y) {
    return x > -1 && x <= rows && y > -1 && y <= cols && mazeArr[x][y] != "W";
  }
}
function PairSet() {
  var c = [];
  this.has = function([x, y]) {
    return c.findIndex(e => 
      e[0] == x && e[1] == y 
    ) == -1 ? false : true;
  }
  this.add = function([x, y]){
    if(this.has([x,y])) return false;
    c.push([x, y]);
    return true;
  }
}
function PriorityQueue() {
  var q = [];
  this.isInQueue = function([x,y]) {
    if(q.length == 0)  return false; 
    let i = q.findIndex(e => x == e[0][0] && y == e[0][1]);
    if (i == -1) return false;
    else return true;
  };
  this.getLength = function() {
    return q.length;
  };
  this.getQueue = function() {
    return q;
  };
  this.getFront = function() {
    return q[0];
  }
  this.enqueue = function(el, score) {
    if (q.length == 0) {
      q.push([el, score]);
    } else {
      let i = q.findIndex(e => score <= e[1]);
      if (i !== -1) q.splice(i, 0, [el, score]);
      else q.push([el, score]);
    }
    return q;
  };
  this.dequeue = function() {
    return q.shift();
  };
}
