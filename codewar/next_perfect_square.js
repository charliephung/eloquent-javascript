function findNextSquare(sq) {
  let tail = sq;
  let head = 1;
  let mid;
  while (true) {
    mid = Math.floor((tail - head) / 2 + head);
    if (mid === tail || mid === head) {
      return -1;
    }
    if (Math.pow(mid, 2) === sq) {
      return Math.pow(mid + 1, 2);
    }
    if (Math.pow(mid, 2) < sq) {
      debugger;
      head = mid;
    }
    if (Math.pow(mid, 2) > sq) {
      tail = mid;
    }
  }
}
