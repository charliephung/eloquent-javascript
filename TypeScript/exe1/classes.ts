import * as Interfaces from "./interfaces";

class Employess {
  title: string;

  addToSchedule(): void {
    console.log("Employee added");
  }
  logTitle(): void {
    console.log(`Employee has the title ${this.title}`);
  }
}

class Research {
  doResearch(topic: string): void {
    console.log(`Doing research on topic ${topic}`);
  }
}

class UniversityLibrarian implements Interfaces.Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(custName: string) {
    console.log(this.name + " is assisting " + custName);
  }
}

abstract class ReferenceItem {
  private _publisher: string;
  static department: string = "Research";

  constructor(public title: string, protected year: number) {
    console.log("Creating a new ReferenceItem...");
  }

  printItem(): void {
    console.log(`${this.title} was published in ${this.year}.`);
    console.log(`Department: ${ReferenceItem.department}`);
  }

  get publisher(): string {
    return this._publisher.toUpperCase();
  }

  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  abstract printCitation(): void;
}

export { UniversityLibrarian, ReferenceItem };
