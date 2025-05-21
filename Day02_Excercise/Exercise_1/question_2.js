//  2. Write a function for format money in shorten (1000 => 1K, 1123400000 => 1.12B , 1342222 => 1.34M)

function formatMoney(num) {
    if (typeof num !== 'number') return ''
    if (num < 1000) return num.toString()
    const units = ['K', 'M', 'B', 'T']
    const unitIndex = Math.floor(Math.log10(num) / 3)
    const unit = units[unitIndex - 1]
    const formattedNum = Math.floor((num / Math.pow(1000, unitIndex)) * 100) / 100
    return `${formattedNum}${unit}`
}
const testNumbers = [1000, 1123400000, 1342222, 999, 1234567890123]
testNumbers.forEach((num) => {
    console.log(`The number ${num} is formatted as ${formatMoney(num)}`)
})