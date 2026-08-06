// dirty version

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let firstHalf = []
    let secondHalf = []
    const mid = Math.ceil(arr.length / 2)

    for (let i = 0; i < arr.length; i++) {
        if (i < mid) {
            firstHalf[firstHalf.length] = arr[i]
        } else {
            secondHalf[secondHalf.length] = arr[i]
        }
    }

    return merge(mergeSort(firstHalf), mergeSort(secondHalf))
}

function merge(first, second) {
    let accumulator = [];
    let j = 0;
    let i = 0;

    while (i < first.length || j < second.length) {
        if (i >= first.length) {
            accumulator.push(second[j]);
            j++
        } else if (j >= second.length) {
            accumulator.push(first[i]);
            i++
        }


        if (first[i] > second[j] && second.length > 0) {
            accumulator.push(second[j])
            j++
        } else if (first[i] <= second[j] && second.length > 0) {
            accumulator.push(first[i])
            i++
        }

    }
    return accumulator
}


const res = mergeSort([1, 2, 3, 4, 5, 7, 8, 9, 0, 98, 3])
console.log(res);