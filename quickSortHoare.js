function quickSort(arr, left, right) {
    if (left >= right) return arr;
    const initialRight = right
    const initialLeft = left
    const pivot = Math.floor(left + (right - left) / 2);
    const pivotValue = arr[pivot]

    // console.log(arr);
    // console.log(pivotValue);


    while (left < right) {
        if (arr[left] > pivotValue) {
            [arr[left], arr[right]] = [arr[right], arr[left]]
        } else if (arr[left] < pivotValue) {
            left++
        }
        if (arr[right] < pivotValue) {
            [arr[left], arr[right]] = [arr[right], arr[left]]
        } else if (arr[right] > pivotValue) {
            right--
        }
    }

    quickSort(arr, initialLeft, right)
    quickSort(arr, left + 1, initialRight)
    return arr;
}

let testArray = [5, 2, 4, 1, 3]

const res = quickSort(testArray, 0, testArray.length - 1)
console.log(res);