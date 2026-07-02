/**
 * MergeSort implementation
 * 
 * Explanation:
 * Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, 
 * calls itself for the two halves, and then merges the two sorted halves.
 * The merge() function is used for merging two halves.
 */

function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // Concatenate values into the resultArray in order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++; 
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; 
        }
    }

    // Concatenate remaining elements
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(arr.length / 2);

    // This is where we will be dividing the array into left and right
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Using recursion to combine the left and right
    return merge(
        mergeSort(left), mergeSort(right)
    );
}

module.exports = mergeSort;
