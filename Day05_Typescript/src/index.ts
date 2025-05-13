import { Book } from './models/book';
import ConsoleReader from './instances/console-reader';
import Users from './instances/users';
import { Library } from './models/library';
import { showMenu, returnToMenu, unauthorizedFeatures, managerFeatures, studentFeatures } from './utils/menu';
import { BookStatusEnum } from './utils/book';
import prompt from './utils/prompt';
import { Manager, Student, User } from './models/user';

async function login(): Promise<User | null> {
    let username: string = await prompt('\nEnter username: ');
    let password: string = await prompt('\nEnter password: ');
    return await users.login(username, password)
}

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
    library.printListBook(library.getBooks());
    const searchTitle = await prompt('Enter book title or author or genre to search: ');
    const foundBooks = library.searchBook(searchTitle);
    if (foundBooks.length < 1) {
        console.log('\nNo books found.');
    } else {
        console.log(`\nFound ${foundBooks.length} book(s):`);
        library.printListBook(foundBooks);
    }
}

async function editBookStatus(): Promise<string> {
    library.printListBook(library.getBooks());
    const bookId = parseInt(await prompt('\nEnter book ID to edit status: ')) || 0;
    if (bookId < 1)
        return '\nBook not found.'

    const book = library.getBooks().find((book) => book.getId() === bookId);
    if (!book)
        return `\nBook with ID "${bookId}" not found.`

    if (book.getStatus() === BookStatusEnum['C'])
        return `\nCannot edit status of Checked Out book.`

    let status = (await prompt('Enter new status (A=Available, L=Lost): ')).toLocaleUpperCase();
    while (status !== 'A' && status !== 'L') {
        console.log('\nInvalid status. Please enter A or L.');
        status = (await prompt('Enter new status (A=Available, L=Lost): ')).toLocaleUpperCase();
    }

    book.setStatus(BookStatusEnum[status]);
    return `\nBook with ID "${bookId}" status updated to "${BookStatusEnum[status]}".`
}

async function removeBook(): Promise<void> {
    library.printListBook(library.getBooks());
    const bookId = parseInt(await prompt('\nEnter book ID to remove: ')) || 0;
    if (bookId > 0) {
        const isBookRemoved = library.removeBook(bookId);
        if (isBookRemoved) {
            console.log(`\nBook with ID "${bookId}" removed successfully!`);
        }

    } else {
        console.log('\nInvalid book ID.');
    }
}

async function borrowBookFromLibrary(): Promise<Book | string> {
    library.printListBook(library.getBooks());
    const bookId = parseInt(await prompt('\nEnter book ID to borrow: ')) || 0;

    const book = library.getBooks().find((book) => book.getId() === bookId);
    if (!book) {
        return '\nInvalid book ID.'
    }

    if (book.getStatus() !== BookStatusEnum['A']) {
        return '\This book cannot be borrow.'
    }

    book.setStatus(BookStatusEnum['C'])
    return book;
}

async function returnBookToLibrary(user: Student): Promise<string> {
    if (user.getBorrowedBook().length === 0)
        return '\nYou dont have borrowed any book.'

    user.printBorrowedBook()
    const bookId = parseInt(await prompt('\nEnter book ID to return: ')) || 0;

    const book = user.getBorrowedBook().find((book) => book.getId() !== bookId);
    if (!book) {
        return '\nInvalid book ID.'
    }

    user.returnBook(book)
    return '\nBook have been returned successfully';
}

async function main() {
    let isExit = false;
    let user: User | null = null;
    while (!isExit) {
        console.clear()
        if (user === null) {
            const choice = await showMenu(unauthorizedFeatures);
            switch (parseInt(choice)) {
                case 1:
                    console.log('\nListing all books...')
                    library.printListBook(library.getBooks());
                    break;
                case 2:
                    console.log('\nLogin...')
                    user = await login();
                    if (user)
                        console.log('\nLogin successfully')
                    else
                        console.log('\nInvalid username or password')
                    break;
                case 3:
                    console.log('\nExiting...');
                    isExit = true;
                    rl.close();
                    break;
                default:
                    console.log('\nInvalid choice. Please try again.');
                    break;
            }
        } else if (user instanceof Manager) {
            console.log(`Hello, Manager: ${user.getUsername()}`)
            const choice = await showMenu(managerFeatures);
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
                    const result = await editBookStatus();
                    console.log(result)
                    break;
                case 5:
                    console.log('\nRemoving a book...')
                    await removeBook();
                    break;
                case 6:
                    console.log('\nLogging out...')
                    user = null
                    break;
                case 7:
                    console.log('\nExiting...');
                    isExit = true;
                    rl.close();
                    break;
                default:
                    console.log('\nInvalid choice. Please try again.');
                    break;
            }
        } else if (user instanceof Student) {
            console.log(`Hello, Student: ${user.getUsername()}`)
            const choice = await showMenu(studentFeatures);
            switch (parseInt(choice)) {
                case 1:
                    console.log('\nSearch Books...')
                    await searchBook();
                    break;
                case 2:
                    console.log('\nMy Borrowed Books...')
                    user.printBorrowedBook();
                    break;
                case 3:
                    console.log('\nBorrow New Book...')
                    if (user.isAvailableToBorrow()) {
                        const result = await borrowBookFromLibrary();
                        if (typeof result === 'string')
                            console.log(result)
                        else {
                            user.borrowBook(result)
                            console.log('\nBook have been borrowed successfully')
                        }
                    } else {
                        console.log('\nYou can only borrow a maximum of 2 books.')
                    }
                    break;
                case 4:
                    console.log('\nReturn Book...')
                    const result = await returnBookToLibrary(user);
                    console.log(result)
                    break;
                case 5:
                    console.log('\nLogging out...')
                    user = null
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
        }
        if (!isExit) {
            await returnToMenu();
        }
    }


}

const rl = ConsoleReader.getInstance();
const users = Users.getInstance();

users.addUser('manager', '12345678', 'Manager')
users.addUser('student', '12345678', 'Student')

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