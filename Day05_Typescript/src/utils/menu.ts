import prompt from "./prompt";


export const managerFeatures = new Map<number, string>([
    [1, 'Add Book'],
    [2, 'List Books'],
    [3, 'Search Book'],
    [4, 'Edit Book Status'],
    [5, 'Remove Book'],
    [6, 'Logout'],
    [7, 'Exit']
]);

export const studentFeatures = new Map<number, string>([
    [1, 'Search Books'],
    [2, 'My Borrowed Book'],
    [3, 'Borrow New Book'],
    [4, 'Return Book'],
    [5, 'Logout'],
    [6, 'Exit']
]);

export const unauthorizedFeatures = new Map<number, string>([
    [1, 'List Books'],
    [2, 'Login'],
    [3, 'Exit']
])


export async function showMenu(features: Map<number, string>): Promise<string> {
    console.log('===== Library Management System =====');
    for (let i = 0; i < features.size; i++) {
        console.log(`${i + 1}. ${features.get(i + 1)}`);
    }
    return await prompt('Please select an option: ');
}

export async function returnToMenu(): Promise<void> {
    await prompt('Press Enter to return to the menu...');
}
