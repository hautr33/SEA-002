import { Book } from './book';

interface ILibrary<T> {
    getBooks(): T[];

    addBook(book: T): void;

    searchBook(searchString: string): T[];

    removeBook(bookId: number): boolean;

    printListBook(books: T[]): void;
}

export class Library implements ILibrary<Book> {

    private books: Book[] = [];
    private idCount: number = 1;

    constructor() {
        this.books = [];
    }

    getBooks(): Book[] {
        return this.books;
    }

    addBook(book: Book): void {
        book.setId(this.idCount++);
        this.books.push(book);
    }

    searchBook(searchString: string): Book[] {
        const searchResults = this.books.filter((book) => {
            return book.getTitle().toLowerCase().includes(searchString.toLowerCase())
                || book.getAuthor().toLowerCase().includes(searchString.toLowerCase())
                || book.getGenre().toLowerCase().includes(searchString.toLowerCase())
        })
        return searchResults;
    }
    removeBook(bookId: number): boolean {
        const book = this.books.find((book) => book.getId() === bookId);
        if (!book) {
            console.log(`\nBook with ID ${bookId} not found.`);
            return false;
        }
        if (book.getStatus() === 'Checked Out' || book.getStatus() === 'Lost') {
            console.log(`\nBook with ID "${bookId}" is currently checked out or lost. So it cannot be removed.`);
            return false;
        }
        this.books = this.books.filter((book) => book.getId() !== bookId);
        return true;
    }

    printListBook(books: Book[]): void {
        if (books.length === 0) {
            console.log('Library ís empty')
        } else {
            console.log('===========================================================================================================================================');
            console.log('ID  | Title                                              | Author                         | Year | Genre                     | Status      ');
            console.log('-------------------------------------------------------------------------------------------------------------------------------------------');
            books.forEach((book) => {
                console.log(book.toString())
            })
            console.log('===========================================================================================================================================');
        }
    }

}