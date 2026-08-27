function binarySearch (array, target) {
    let left = 0
    let right = array.length - 1
    let mid
    
    while (left <= right) {
        mid = left + Math.floor((right - left) / 2)
        
        if (array[mid] == target)
            return mid  
         
        if (array[mid] < target) {
            left = mid + 1
        }
        else {
            right = mid - 1
        }

    }
    
    return -1;
}

const test = [1,2,3,4,5,6,7,8,9,0]
const target = binarySearch(test, 8)
console.log(test[target])