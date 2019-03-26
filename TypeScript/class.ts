class Engine {
  public horsePower: number;
  public engineType: string;

  constructor(horsePower: number, engineType: string) {}
}

class Car {
  private _engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }
  get engine(): Engine {
    return this._engine;
  }
  set engine(value: Engine) {
    if (value === undefined) throw "Please supply engine";

    this._engine = value;
  }

  start(): void {
    alert("Car started " + this._engine.engineType);
  }
}
