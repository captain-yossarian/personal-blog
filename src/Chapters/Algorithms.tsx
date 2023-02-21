// https://en.wikipedia.org/wiki/Binary_search_algorithm
export const binarySearch = (list: number[], value: number) => {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (list[mid] < value) {
      low = mid + 1;
    } else if (list[mid] > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};

const result = binarySearch([11, 12, 40, 94, 102, 125, 244, 677, 999], 94);

console.log(result);
