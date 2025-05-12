import { BookStatus } from "./util";

interface IBook {
    id: number | null;
}

export class Book implements IBook {
    id: number | null =null;
    private title: string;
    private author: string;
    private year: number;
    private genre: string;
    private status: BookStatus = 'Available';

    constructor(title: string, author: string, year: number, genre: string) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
    }

    getId(): number | null {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getYear(): number {
        return this.year;
    }

    getGenre(): string {
        return this.genre;
    }

    getStatus(): string {
        return this.status;
    }

    setId(id: number): void {
        this.id = id;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    setAuthor(author: string): void {
        this.author = author;
    }

    setYear(year: number): void {
        this.year = year;
    }

    setGenre(genre: string): void {
        this.genre = genre;
    }

    setStatus(status: 'Available' | 'Checked Out' | 'Lost'): void {
        this.status = status;
    }

    toString(): string {
        return `${this.id!.toString().padEnd(3, ' ')} | ${this.title.padEnd(50, ' ')} | ${this.author.padEnd(30, ' ')} | ${this.year.toString().padEnd(4, ' ')} | ${this.genre.padEnd(25, ' ')} | ${this.status.padEnd(11, ' ')}`;
    }
}