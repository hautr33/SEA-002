import { Book } from './book';
import ConsoleReader from './console-reader';
import { Library } from './library';
import { showMenu, returnToMenu, prompt, BookStatusEnum } from './util';

const rl = ConsoleReader.getInstance();

async function addNewBook(): Promise<void> {
    let title: string = await prompt('Enter book title: ');
    while (title.length < 3) {
        console.log('\nTitle length >= 3.');
        title = await prompt('Enter book title: ');
    }

    let author: string = await prompt('\nEnter book author: ');
    while (author.length < 3) {
        console.log('\nAuthor length >= 3.');
        author = await prompt('Enter book author: ');
    }

    let year: number = parseInt(await prompt('\nEnter book year: ')) || 0;
    const currentYear = new Date().getFullYear();
    while (year < 1900 || year > currentYear) {
        console.log(`\nYear from 1900 to ${currentYear}.`);
        year = parseInt(await prompt('Enter book year: ')) || 0;
    }

    let genre: string = await prompt('\nEnter book genre: ');
    while (genre.length < 3) {
        console.log('\nGenre length >= 3.');
        genre = await prompt('Enter book genre: ');
    }

    const newBook = new Book(title, author, year, genre)
    library.addBook(newBook)
    console.log(`\nBook "${title}" added successfully!`);
}

async function searchBook(): Promise<void> {
    const searchTitle = await prompt('Enter book title or author to search: ');
    const foundBooks = library.searchBook(searchTitle);
    if (foundBooks.length < 1) {
        console.log('\nNo books found.');
    } else {
        console.log(`\nFound ${foundBooks.length} book(s):`);
        library.printListBook(foundBooks);
    }
}

async function editBookStatus(): Promise<void> {
    library.printListBook(library.getBooks());
    const bookId = parseInt(await prompt('\nEnter book ID to edit status: ')) || 0;
    if (bookId < 1) {
        console.log('\nBook not found.');
        return
    }

    const book = library.getBooks().find((book) => book.getId() === bookId);
    if (!book) {
        console.log(`\nBook with ID "${bookId}" not found.`);
        return
    }

    let status = (await prompt('Enter new status (A=Available, C=Checked Out, L=Lost): ')).toLocaleUpperCase();
    while (status !== 'A' && status !== 'C' && status !== 'L') {
        console.log('\nInvalid status. Please enter A, C, or L.');
        status = (await prompt('Enter new status (A=Available, C=Checked Out, L=Lost): ')).toLocaleUpperCase();
    }

    book.setStatus(BookStatusEnum[status]);
    console.log(`\nBook with ID "${bookId}" status updated to "${BookStatusEnum[status]}".`);
}

async function removeBook(): Promise<void> {
    library.printListBook(library.getBooks());
    const bookId = parseInt(await prompt('\nEnter book ID to remove: ')) || 0;
    if (bookId > 0) {
        const isBookRemoved = library.removeBook(bookId);
        if (isBookRemoved) {
            console.log(`\nBook with ID ""${bookId}" removed successfully!`);
        }

    } else {
        console.log('\nInvalid book ID.');
    }
}
async function main() {
    let isExit = false;

    while (!isExit) {
        const choice = await showMenu();
        switch (parseInt(choice)) {
            case 1:
                console.log('\nAdding a new book...')
                await addNewBook();
                break;
            case 2:
                console.log('\nListing all books...')
                library.printListBook(library.getBooks());
                break;
            case 3:
                console.log('\nSearching for a book...')
                await searchBook();
                break;
            case 4:
                console.log('\nEditing book status...')
                await editBookStatus();
                break;
            case 5:
                console.log('\nRemoving a book...')
                await removeBook();
                break;
            case 6:
                console.log('\nExiting...');
                isExit = true;
                rl.close();
                break;
            default:
                console.log('\nInvalid choice. Please try again.');
                break;
        }
        if (!isExit) {
            await returnToMenu();
        }
    }
}

const library = new Library();

const books: Book[] = new Array(10);
books[0] = new Book('Clean Code', 'Robert C. Martin', 2008, 'Software Engineering');
books[1] = new Book('The Pragmatic Programmer', 'Andrew Hunt & David Thomas', 1999, 'Software Engineering');
books[2] = new Book('The Art of Computer Programming', 'Donald E. Knuth', 1968, 'Algorithms');
books[3] = new Book('Refactoring: Improving the Design of Existing Code', 'Martin Fowler', 1999, 'Software Engineering');
books[4] = new Book('Introduction to Algorithms', 'Thomas H. Cormen,...', 1990, 'Algorithms');
books[5] = new Book('Code Complete', 'Steve McConnell', 2004, 'Software Engineering');
books[6] = new Book('The Mythical Man-Month', 'Frederick P. Brooks Jr.', 1975, 'Project Management');
books[7] = new Book('Soft Skills: The Software Developer\'s Life Manual', 'John Sonmez', 2014, 'Career Development');
books[8] = new Book('You Don\'t Know JS Yet', 'Kyle Simpson', 2020, 'JavaScript');
books[9] = new Book('Cracking the Coding Interview', 'Gayle Laakmann McDowell', 2015, 'Interview Preparation');

books.forEach(book => {
    library.addBook(book);
});

main();