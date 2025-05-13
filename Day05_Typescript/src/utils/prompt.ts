import ConsoleReader from '../instances/console-reader';

const rl = ConsoleReader.getInstance();

function prompt(question: string): Promise<string> {
    return new Promise<string>((resolve) => {
        rl.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}

export default prompt