function bubbleSort(arr) {
    let swap = true
    while (swap) {
        swap = false
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp
                swap = true;
            }
        }
    }
    return arr;
}

const result = bubbleSort([1, 2, 3, 4, 5, 7, 8, 9, 0, 98, 3])
console.log(result);
