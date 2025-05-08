// print how to read number in vietnamese: n integer < 1,000,000

const digits = [
    { value: 1000000, symbol: 'triệu' },
    { value: 1000, symbol: 'nghìn' },
    { value: 100, symbol: 'trăm' },
    { value: 10, symbol: 'mươi' },
];
const units = [
    { value: 9, symbol: 'chín' },
    { value: 8, symbol: 'tám' },
    { value: 7, symbol: 'bảy' },
    { value: 6, symbol: 'sáu' },
    { value: 5, symbol: 'năm' },
    { value: 4, symbol: 'bốn' },
    { value: 3, symbol: 'ba' },
    { value: 2, symbol: 'hai' },
    { value: 1, symbol: 'một' },
    { value: 0, symbol: 'không' }
]

const test = 'a'
function abc() {
    const test = 1
    console.log(test)
    console.log(this.test)
}

function countDown(time) {
    for (var i = time; i >= 0; i--) {
        console.log(i)
        // setTimeout(function(){
        // console.log(i)
        // }, (time - i) * 1000)
    }
}

const dog = {
    bark: function () {
        console.log('woof', this)
    },
    bark2: () => {
        console.log('woof', this)
    }
}

const user = {
    name: "Ronaldo",
    // Regular function
    sayNameRegular: function () {
        var self = this; // store reference to the current object
        console.log(`Regular: ${this.name}`);
        // this points to global object (Window)
        setTimeout(function () {
            console.log(`Regular timeout: ${self.name}`);
        }, 1000);
    },
};
user.sayNameRegular();

