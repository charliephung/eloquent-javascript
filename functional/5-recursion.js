function mult(n, n1, ...rest) {
  if (rest.length === 0) return n1 === undefined ? n : n * n1;
  return n * mult(n1, ...rest);
}

console.log(mult(3, 4, 5, 6));
