// 2. Write the function to get a random integer between 2 numbers: min, max;
function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

min = 10;
max = 20;

console.log(`Random integer between ${min} and ${max}: ${getRandomInt(min, max)}`);