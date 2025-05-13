import { BookStatus } from "./util";

interface IBookGetter {
    getId(): number | null;

    getTitle(): string;

    getAuthor(): string;

    getYear(): number;

    getGenre(): string;

    getStatus(): string;
}

interface IBookSetter {
    setId(id: number): void

    setTitle(title: string): void

    setAuthor(author: string): void

    setYear(year: number): void

    setGenre(genre: string): void

    setStatus(status: 'Available' | 'Checked Out' | 'Lost'): void
}

type IBook = IBookGetter & IBookSetter


export class Book implements IBook {
    private _id: number | null = null;
    private _title: string;
    private _author: string;
    private _year: number;
    private _genre: string;
    private _status: BookStatus = 'Available';

    constructor(title: string, author: string, year: number, genre: string) {
        this._title = title;
        this._author = author;
        this._year = year;
        this._genre = genre;
    }

    getId(): number | null {
        return this._id;
    }

    getTitle(): string {
        return this._title;
    }

    getAuthor(): string {
        return this._author;
    }

    getYear(): number {
        return this._year;
    }

    getGenre(): string {
        return this._genre;
    }

    getStatus(): string {
        return this._status;
    }

    setId(id: number): void {
        this._id = id;
    }

    setTitle(title: string): void {
        this._title = title;
    }

    setAuthor(author: string): void {
        this._author = author;
    }

    setYear(year: number): void {
        this._year = year;
    }

    setGenre(genre: string): void {
        this._genre = genre;
    }

    setStatus(status: 'Available' | 'Checked Out' | 'Lost'): void {
        this._status = status;
    }

    toString(): string {
        return `${(this._id as number).toString().padEnd(3, ' ')} | ${this._title.padEnd(50, ' ')} | ${this._author.padEnd(30, ' ')} | ${this._year.toString().padEnd(4, ' ')} | ${this._genre.padEnd(25, ' ')} | ${this._status.padEnd(11, ' ')}`;
    }
}