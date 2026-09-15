function heapify(array, index = Math.floor(array.length / 2) - 1) {
  if (!array[index]) return array;
  let leftIndex = 2 * index + 1;
  let rightIndex = 2 * index + 2;
  let maxIndex = getMaxIndex(array, leftIndex, rightIndex);

  if (array[index] < array[maxIndex]) {
    const temp = array[index];
    array[index] = array[maxIndex];
    array[maxIndex] = temp;
    heapify(array, maxIndex);
  }

  heapify(array, --index)
  return array;
}

function swap(a, b) {
  const temp = a;
  a = b;
  b = temp;
}

function getMaxIndex(array, indexA, indexB) {
  if (array[indexA] && array[indexA] > array[indexB]) {
    return indexA;
  }
  if (array[indexB]) return indexB;
  return indexA;
}

const array = [5, 3, 2, 10, 1, 9, 8, 6, 4, 7]
const heap = heapify(array);

console.log(heap);
