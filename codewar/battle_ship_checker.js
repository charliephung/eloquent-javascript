function validateBattlefield(field) {
// TODO:  Check for amount of ships
  var shipPosition = field
  .reduce(
    (position, el, i) => 
      position.concat(
        el.reduce(
          (row, el1, j) => 
            el1 == 1 
            ? (row.push([i,j]), row) 
            : row ,[]))
      , [])
  
  console.log(shipPosition);
    return shipPosition.every(validatePosition);
  
  function validatePosition(pos) {
     return  validateX(pos) && validateCross(pos);
  }
   function validateCross([x,y], direction = []) {
      if(direction.length > 4) return false;
   
      var dir = {up: 0, right: 0, down: 0, left: 0}
      
      if(field[x,y + 1] == 1) dir.right = 1; 
      if(field[x,y - 1] == 1) dir.left = 1; 
      if(field[x + 1, y] == 1) dir.up = 1; 
      if(field[x - 1, y] == 1) dir.down = 1;
      
      var newDirection = direction.concat(
        Object.keys(dir).reduce((direc, key) => 
          dir[key] == 1 
          ? direc.concat(key) 
          : direc, []));
      
      if(!newDirection.every((val,i,arr) => val === arr[0])) 
        return false;
      
      if(dir.right == 1) 
        return validateCross([x,y + 1], newDirection);
      if(dir.left == 1) 
        return validateCross([x,y - 1], newDirection);
      if(dir.up == 1) 
        return validateCross([x + 1,y], newDirection);
      if(dir.down == 1) 
        return validateCross([x - 1,y], newDirection);
   
      return true;
   }
   function validateX([x,y]) {
      if(x - 1 != -1 && y - 1 != -1)
        if(field[x - 1][y - 1] == 1) return false;
      if(x - 1 != -1 && y + 1 != field[0].length)
        if(field[x - 1][y + 1] == 1) return false;
      if(x + 1 != field[0].length && y + 1 != field[0].length)
        if(field[x + 1][y + 1] == 1) return false;
      if(x + 1 != field[0].length && y - 1 != 0)
        if(field[x + 1][y - 1] == 1) return false;
        
      return true;
   }
}
