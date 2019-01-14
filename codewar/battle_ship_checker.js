function validateBattlefield(field) {
  var position = [];
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
  
  var shipCount= {
    battleship : 0,
    cruisers : 0,
    destroyers : 0,
    submarines : 0
  }
  
   return shipPosition.every(validatePosition) && validateShipsAmount();
  
  function validatePosition(pos) {
     return  validateX(pos) && validateCross(pos);
  }
   function validateCross([x,y], direction = []) {
   // Memorize solution and skip of already check
      if( position.indexOf(plusString(x, y))  == -1)
        position.push(plusString(x,y))
      else return true;
    // False when out of length     
      if(direction.length > 4) return false;
   
     
      var dir = {up: 0, right: 0, down: 0, left: 0}
      
      if(isPositionValid(x, y + 1)  && position.indexOf(plusString(x, y + 1))  == -1)
        if(field[x][y + 1] == 1) dir.right = 1; 
        
      if(isPositionValid(x, y - 1)  && position.indexOf(plusString(x, y - 1)) == -1)
        if(field[x][y - 1] == 1) dir.left = 1; 
        
      if(isPositionValid(x + 1, y)  && position.indexOf(plusString(x + 1, y)) == -1)
        if(field[x + 1][y] == 1) dir.down = 1; 
        
      if(isPositionValid(x - 1, y)  && position.indexOf(plusString(x - 1, y )) == -1)
        if(field[x - 1][ y] == 1) dir.up = 1;
      
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
        return validateCross([x - 1,y], newDirection);
      if(dir.down == 1) 
        return validateCross([x + 1,y], newDirection);
       
      
      if(newDirection.length == 3 ) shipCount.battleship += 1; 
      if(newDirection.length == 2 ) shipCount.cruisers += 1; 
      if(newDirection.length == 1 ) shipCount.destroyers += 1; 
      if(newDirection.length == 0 ) shipCount.submarines += 1; 
      return true;
   }
   function validateX([x,y]) {
      if(isPositionValid(x - 1, y - 1))
        if(field[x - 1][y - 1] == 1) return false;
      if(isPositionValid(x - 1, y + 1))
        if(field[x - 1][y + 1] == 1) return false;
      if(isPositionValid(x + 1, y + 1))
        if(field[x + 1][y + 1] == 1) return false;
      if(isPositionValid(x + 1, y - 1))
        if(field[x + 1][y - 1] == 1) return false;
        
      return true;
   }
   
   function countShip(length) {
     switch(length) {
       case 1: shipCount.submarines += 1;
       case 2: shipCount.destroyers   += 1;
       case 3: shipCount.cruisers  += 1;
       case 4: shipCount.battleship  += 1;
     }
   }
   
   function isPositionValid(x,y) {
     return x >= 0 && x < field.length 
         && y >= 0 && y < field.length;
   }
   
   function validateShipsAmount() {
     if(shipCount.submarines !== 4) return false;
     if(shipCount.battleship !== 1) return false;
     if(shipCount.cruisers !== 2) return false;
     if(shipCount.destroyers !== 3) return false;
     return true;
   }
   function plusString(x,y) {
     return String(x) + String(y);
   }
}
