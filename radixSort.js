// This one takes constant time O(1) to compute since Number.prototype.toString() takes constant time
function getDigit(num, place, longestNumber) {
    const string = num.toString();
    const size = string.length;
    
    const mod = longestNumber - size;
    return string[place - mod] || 0;
    
}

//Linear time too
function getLongestNumber(num) {
    let longest = num.reduce((acc, curr) => curr > acc ? curr : acc, num[0]);
    return longest.toString().length;
}

function radixSort(arr) {
    let bucket = new Array(10).fill().map(() => []);
    const longestNumber = getLongestNumber(arr)
    for(let i = longestNumber - 1; i >= 0; i--) {
        
        while (arr.length) {
            const current = arr.shift()
            const digit = getDigit(current, i, longestNumber)
            bucket[digit].push(current)
        }
        
        for(let j = 0; j < bucket.length; j++) {
            while(bucket[j].length) {
                const current = bucket[j].shift()
                arr.push(current)
            }
        }
    }
    
    return arr;
}

console.log(radixSort([
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ]))