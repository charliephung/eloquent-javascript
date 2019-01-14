function zero(f) {
  return typeof f == "function" ? f(0) : 0;
}
function one(f) {
  return typeof f == "function" ? f(1) : 1;
}
function two(f) {
  return typeof f == "function" ? f(2) : 2;
}
function three(f) {
  return typeof f == "function" ? f(3) : 3;
}
function four(f) {
  return typeof f == "function" ? f(4) : 4;
}
function five(f) {
  return typeof f == "function" ? f(5) : 5;
}
function six(f) {
  return typeof f == "function" ? f(6) : 6;
}
function seven(f) {
  return typeof f == "function" ? f(7) : 7;
}
function eight(f) {
  return typeof f == "function" ? f(8) : 8;
}
function nine(f) {
  return typeof f == "function" ? f(9) : 9;
}

function plus(num) {
  return  function cal(a) {
    return a + num;
  }
}
function minus(num) {
  return  function cal(a) {
    return a - num;
  }
}
function times(num) {
  return  function cal(a) {
    return a * num;
  }
}
function dividedBy(num) {
  return  function cal(a) {
    return Math.floor(a / num);
  }
}
