function bar(x, y) {
  var z;
  foo(x);
  return [y, z];

  // Purify foo by wrap it with bar
  function foo(x) {
    y++;
    z = x * y;
  }
}
var y = 5,
  z;

console.log(bar(20, 5));
console.log(z);
