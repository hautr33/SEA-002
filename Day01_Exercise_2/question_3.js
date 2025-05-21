// 3. Write the function get a random element from an arrays.
function getRandomElement(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Error: Input must be a non-empty array!");
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

try {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    console.log(`Random element from array [${arr}]: ${getRandomElement(arr)}`);
}
catch (error) {
    console.error(error.message);
}