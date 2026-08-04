function crossAdd(input, answer = [], step = 0) {
    const mid = Math.floor(input.length / 2)
    const stopCondition = step > mid

    if (stopCondition) return answer;

    const forward = input[step]
    const backward = input[input.length - 1 - step]
    sum = backward + forward
    answer.push(sum)

    return crossAdd(input, answer, step + 1)
}


const result = crossAdd([1, 2, 3, 4, 5, 7, 8, 9, 0, 98, 3]);

console.log(result);
