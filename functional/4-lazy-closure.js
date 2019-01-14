const sum = (x, y) => {
  let res;
  return () => {
    if (res === undefined) {
      res = x + y;
    }
    return res;
  };
};

let t = sum(1, 2);

t(); // calculate res
t(); // dont have to do the work just return
