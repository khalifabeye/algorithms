function quickSort(arr, pivot) {
    // base case
    if (arr.length <= 1) return arr;
    // create left and righ arrays
    const left = []
    const right = []
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i]
        if (i !== pivot && el <= arr[pivot]) left.push(el)
        if (el > arr[pivot]) right.push(el)
    }
    const leftSorted = quickSort(left, Math.floor(left.length / 2))
    const rightSorted = quickSort(right, Math.floor(right.length / 2))
    return leftSorted.concat(arr[pivot], rightSorted);
}

const res = quickSort([4, 1, 4, 3, 4, 2, 4], 6)
console.log(res);
