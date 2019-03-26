module Person {
  var person: string;
  var age: number;
  var isReady: boolean;

  const getArrayLength: Function = (arr: any[]): number => arr.length;

  const persons: string[] = ["hiep", "phung", "ba"];

  const rec: object = {
    h: 10,
    w: 20
  };
  const squareIt: Function = (rec: { h: number; w: number }) => rec.h * rec.w;
}
