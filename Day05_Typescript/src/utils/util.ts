import ConsoleReader from './console-reader';

const rl = ConsoleReader.getInstance();

const features = new Map<number, string>([
    [1, 'Add Book'],
    [2, 'List Books'],
    [3, 'Search Book'],
    [4, 'Edit Book Status'],
    [5, 'Remove Book'],
    [6, 'Exit']
]);
export type BookStatus = 'Available' | 'Checked Out' | 'Lost';

export enum BookStatusEnum {
    A = 'Available',
    C = 'Checked Out',
    L = 'Lost'
}

export function prompt(question: string): Promise<string> {
    return new Promise<string>((resolve) => {
        rl.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}

export async function showMenu(): Promise<string> {
    console.clear();
    console.log('===== Library Management System =====');
    for (let i = 0; i < features.size; i++) {
        console.log(`${i + 1}. ${features.get(i + 1)}`);
    }
    return await prompt('Please select an option: ');
}

export async function returnToMenu(): Promise<void> {
    await prompt('Press Enter to return to the menu...');
}

exports = {
    prompt,
    showMenu,
    returnToMenu,
    rl,
    BookStatusEnum,
};