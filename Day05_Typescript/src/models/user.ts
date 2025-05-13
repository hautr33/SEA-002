import bcrypt from 'bcrypt'
import { Book } from './book'
import Users from '../instances/users'
import { BookStatusEnum } from '../utils/book';

export abstract class User {
    protected username: string;
    protected password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    static async create<T extends User>(
        this: new (username: string, password: string) => T,
        username: string,
        password: string
    ): Promise<T | null> {
        try {
            const isExisted = Users.getInstance().findUser(username) !== undefined;
            if (isExisted) return null;

            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);
            return new this(username, hashPassword);
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password)
    }

    getUsername(): string {
        return this.username
    }

    setUsername(username: string) {
        this.username = username
    }

    abstract getRole(): string;
}

export class Manager extends User {
    getRole(): string {
        return 'Manager';
    }
}

export class Student extends User {
    private books: Book[] = []
    private maxBorrowQuantity: number = 2

    getRole(): string {
        return 'Student';
    }

    getBorrowedBook(): Book[] {
        return this.books
    }

    isAvailableToBorrow(): boolean {
        return this.books.length < this.maxBorrowQuantity
    }

    borrowBook(book: Book): boolean {
        if (this.books.length < this.maxBorrowQuantity) {
            this.books.push(book)
            return true
        }
        return false
    }

    returnBook(book: Book): void {
        this.books = this.books.filter(b => b.getId() === book.getId())
        book.setStatus(BookStatusEnum['A'])
    }

    printBorrowedBook(): void {
        if (this.books.length === 0) {
            console.log('\nYou dont have borrowed books')
        } else {
            console.log('=============================================================================================================================');
            console.log('ID  | Title                                              | Author                         | Year | Genre                     ');
            console.log('-----------------------------------------------------------------------------------------------------------------------------');
            this.books.forEach((book) => {
                console.log(book.toStringExcludeStatus())
            })
            console.log('=============================================================================================================================');
        }
    }
}




exports = {
    Manager,
    Student
}