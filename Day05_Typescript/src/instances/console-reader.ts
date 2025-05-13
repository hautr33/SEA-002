import * as readline from "readline";

class ConsoleReader {
    private static instance: readline.Interface;

    private constructor() { }

    public static getInstance(): readline.Interface {
        if (!ConsoleReader.instance) {
            ConsoleReader.instance = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        }
        return ConsoleReader.instance;
    }
}

export default ConsoleReader