/**
 * QuickSort implementation (Recursive)
 * 
 * Explanation:
 * QuickSort is a Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot.
 * Here, we pick the last element as the pivot. The key process in quickSort is partition().
 * Target of partition is, given an array and an element x of array as pivot, put x at its correct position in sorted array and put all smaller elements (smaller than x) before x, and put all greater elements (greater than x) after x. All this should be done in linear time.
 */

function quickSortRecursive(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSortRecursive(left), pivot, ...quickSortRecursive(right)];
}

module.exports = quickSortRecursive;
