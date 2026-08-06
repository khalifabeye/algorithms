// naive version
function fibonacciSuit(num) {
    if (num == 0 || num == 1) return num;
    return (fibonacciSuit(num - 1) + fibonacciSuit(num - 2));
}

console.log(fibonacciSuit(100));