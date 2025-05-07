// Student Management System Assignment Requirements
// Build A Student Management Application With The Following Features:
// 1.Store Student Information (Id, Name, Age, Grade)
// 2.Display The List Of Students
// 3.Add New Students To The List
// 4.Search For Students By Name
// 5.Display Statistics:
//  - Total Number Of Students
//  - Average Grade Of All Students
//  - Number Of Students By Classification: Excellent (≥ 8), Good (≥ 6.5), Average (< 6.5)
// 6.Save The Student List To A File (JSON)
// 7.Load The Student List From File On Startup
// The Application Should Have A Command-Line Interface That Allows Users To Select Functions Through An Interactive Menu.

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'students.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

class Student {
    constructor(id, name, age, grade) {
        this.id = id;
        this.name = name;
        this.age = Number(age);
        this.grade = Number(grade);
    }

    displayInfo() {
        console.log(`ID: ${this.id}\t| Name: ${this.name}\t| Age: ${this.age}\t| Grade: ${this.grade}`);
    }

    isExcellent() {
        return this.grade >= 8;
    }

    isGood() {
        return this.grade >= 6.5 && this.grade < 8;
    }

    isAverage() {
        return this.grade < 6.5;
    }
}

const defaultData = [
    { id: 1, name: "Anh", age: 18, grade: 1 },
    { id: 2, name: "Bao", age: 19, grade: 2 },
    { id: 3, name: "Cuong", age: 20, grade: 3 },
    { id: 4, name: "Dat", age: 21, grade: 4 },
    { id: 5, name: "Giang", age: 22, grade: 5 },
    { id: 6, name: "Huy", age: 18, grade: 6 },
    { id: 7, name: "Kiet", age: 19, grade: 7 },
    { id: 8, name: "Linh", age: 20, grade: 8 },
    { id: 9, name: "Mai", age: 21, grade: 9 },
    { id: 10, name: "Nam", age: 22, grade: 10 }
];

function loadStudents() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data).map(student => new Student(student.id, student.name, student.age, student.grade));
    }
    return defaultData.map(data => new Student(data.id, data.name, data.age, data.grade));
}

function addStudent(students, id, name, age, grade) {
    const newStudent = new Student(id, name, age, grade);
    students.push(newStudent);
    console.log(`Added new student: ${name}`);
}

function calculateAverageGrade(students) {
    if (students.length === 0) return 0;
    const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);
    return (totalGrades / students.length).toFixed(2);
}

const features = {
    1: 'Display The List Of Students',
    2: 'Add New Students To The List',
    3: 'Search For Students By Name',
    4: 'Display Statistics',
    5: 'Save The Student List To A File',
    6: 'Exit'
};

function showMenu() {
    console.clear();
    console.log('===== Student Management System =====');
    for (let i in features) {
        console.log(`${i}. ${features[i]}`);
    }
    rl.question('\n-> Input your choice: ', handleChoice);
}

function returnToMenu() {
    rl.question('\nPress Enter to back to menu...', () => {
        showMenu();
    });
}

async function handleChoice(choice) {
    switch (choice) {
        case '1':
            console.log("List of Students:");
            if (students.length === 0) {
                console.log("No students found.");
                return;
            } else {
                students.forEach((student) => {
                    student.displayInfo();
                });
            }
            returnToMenu();
            break;
        case '2':
            const id = students.length + 1;

            let name = await ask('Enter Name: ');
            while (name.length < 3) {
                console.log("Name must be at least 3 characters long.");
                name = await ask('Enter Name: ');
            }

            let age = await ask('Enter Age: ');
            while (!Number.isInteger(Number(age)) || age < 1) {
                console.log("Age must be a positive integer.");
                age = await ask('Enter Age: ');
            }

            let grade = await ask('Enter Grade: ');
            while (isNaN(grade) || grade < 0 || grade > 10) {
                console.log("Grade >= 0 and <= 10");
                grade = await ask('Enter Grade: ');
            }

            addStudent(students, id, name, age, grade);
            returnToMenu();
            break;
        case '3':
            const searchName = await ask('Enter Name to search: ');

            const foundStudents = students.filter(student => student.name.toLowerCase().includes(searchName.toLowerCase()));

            if (foundStudents.length > 0) {
                console.log("Found Students:");
                foundStudents.forEach(student => student.displayInfo());
            } else {
                console.log("No students found.");
            }

            returnToMenu();
            break;
        case '4':
            const totalStudents = students.length;

            if (totalStudents === 0) {
                console.log("No students to calculate statistics.");
            } else {
                const averageGrade = calculateAverageGrade(students);
                const excellentCount = students.filter(student => student.isExcellent()).length;
                const goodCount = students.filter(student => student.isGood()).length;
                const averageCount = students.filter(student => student.isAverage()).length;

                console.log(`Total Students: ${totalStudents}`);
                console.log(`Average Grade: ${averageGrade}`);
                console.log(`Excellent Students: ${excellentCount}`);
                console.log(`Good Students: ${goodCount}`);
                console.log(`Average Students: ${averageCount}`);
            }

            returnToMenu();
            break;
        case '5':
            fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
                if (err) {
                    console.error('Error saving students to file:', err);
                } else {
                    console.log(`Students saved to ${filePath}`);
                }
                returnToMenu();
            });
            break;
        case '6':
            console.log('Exiting the program. Goodbye!');
            rl.close();
            return;
        default:
            console.log('Invalid choice. Please try again.');
            returnToMenu();
            break;
    }
}

const students = loadStudents();
showMenu();