// convert to Roman number: n integer < 1,000

function intToRoman(num) {
    if (!Number.isInteger(Number(num)) || num < 1 || num >= 1000) {
        return 'Input must be an integer between 1 and 999';
    }

    const romanNumerals = [
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let result = '';

    for (const numeral of romanNumerals) {
        while (num >= numeral.value) {
            result += numeral.symbol;
            num -= numeral.value;
        }
    }

    return result;
}
const testCases = [1, 4, 9, 1994, 58, 1000, -1, 'abc', 500.5];
testCases.forEach(testCase => {
    console.log(`Input: ${testCase.toString().padEnd(10, ' ')}=> Output: ${intToRoman(testCase)}`);
});