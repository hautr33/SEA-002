// 1. Write the function to calculate the combination (Cnk)
function combination(n, k) {
    n = BigInt(n);
    k = BigInt(k);

    if (k > n || k < 0n) return 0n;
    if (k === 0n || k === n) return 1n;

    if (k > n - k) {
        k = n - k; // C(n, k) = C(n, n - k)
    }

    // C(n, k) = n! / (k! * (n - k)!) = n * (n - 1) * ... * (n - k + 1) / k!
    let result = 1n;
    for (let i = 1n; i <= k; i++) {
        result = result * (n - i + 1n) / i;
    }

    return result;
}

let n = 60000;
let k = 30000;

let result = combination(n, k);

if (result === 0n) {
    console.log("Input error: k <= n and >= 0");
} else {
    console.log(`C(${n}, ${k}) = ${combination(n, k)}`);
}