// 4. Given two arrays of integers, find which elements in the second array are missing from the first array.
function findMissingElements(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error("Error: Both inputs must be arrays!");
    }

    const missingElements = arr2.filter(element => !arr1.includes(element));

    return missingElements;
}

try {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [2, 3, 6, 7];

    let missingElements = findMissingElements(arr1, arr2);

    if (missingElements.length === 0) {
        console.log(`No missing elements from [${arr1}] in [${arr2}]`);
    } else {
        console.log(`Missing elements from [${arr1}] in [${arr2}]: ${missingElements}`);
    }
}
catch (error) {
    console.error(error.message);
}