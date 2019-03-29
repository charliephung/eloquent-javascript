import { Category } from "./enums";
import { Book, Logger, Author, Librarian, Magazine } from "./interfaces";
import { UniversityLibrarian, ReferenceItem } from "./classes";
import * as util from "./lib/utilityFunctions";

const PrintBookInfo = (item: Book): void => {
  console.log(`${item.title} was authored by ${item.author}`);
};

let [book1, book2] = util.GetAllBooks();
PrintBookInfo(book1);
PrintBookInfo(book2);

let allBooks: Book[] = util.GetAllBooks();
let allMagazines: Magazine[] = util.GetAllMagazines();

const PrintTitle = (item: Book | Magazine) => console.log(item.title);

let serialNovel: Book & Magazine = {
  id: 100,
  title: "YDKJS",
  author: "KS",
  category: Category.Software,
  available: true,
  publisher: "KS"
};

// let frequency: "always" | "never" = "never";
type Frequency = "always" | "never";
