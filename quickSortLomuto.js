function quickSort(arr, low, high) {
    if (low >= high) return arr;

    const pivotValue = arr[high];
    console.log(arr);


    let i = low;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivotValue) {
            [arr[j], arr[i]] = [arr[i], arr[j]]
            i++
        }
    }

    [arr[high], arr[i]] = [arr[i], arr[high]]

    quickSort(arr, low, i - 1)
    quickSort(arr, i + 1, high)
    return arr;
}

let testArray = [5, 2, 8, 1, 3]

const res = quickSort(testArray, 0, testArray.length - 1)
console.log(res);
