module Demo {
  interface SquareFunction {
    (x: number): number;
  }

  const squareIt: SquareFunction = number => number * number;

  interface Person {
    name: string;
    age: number;
    pets: () => number;
    greet: (line: string) => void;
    makeOlder: (year: number) => void;
  }

  const charlie: Person = {
    name: "charlie",
    age: 21,
    pets() {
      return 5;
    },
    greet(line) {
      return line + " " + this.name;
    },
    makeOlder(year) {
      this.age += year;
    }
  };
}
