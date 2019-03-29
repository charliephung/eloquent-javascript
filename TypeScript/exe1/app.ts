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
