class A {
    constructor() {
        console.log('A constructor');
        this.initConfig(); // Gọi hàm override trong B
    }

    initConfig() {
        console.log('A.initConfig');
    }
}

class B extends A {
    age: number = 10;

    initConfig() {
        console.log(`B.initConfig - Age is ${this.age}`); // this.age lúc này là undefined
    }
}

const b = new B();
console.log(`Final age: ${b.age}`); // age = 10
