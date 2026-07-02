/**
 * QuickSort implementation (Iterative)
 * 
 * Explanation:
 * The iterative version of QuickSort uses an explicit stack to keep track of the start and end indices
 * of the sub-arrays to be sorted, simulating the call stack of the recursive version.
 * This can help avoid call stack overflow errors on very deep recursion limits, although it still takes O(N) space in the worst case.
 */

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            // swap arr[i] and arr[j]
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    // swap arr[i+1] and arr[high] (or pivot)
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
  
    return i + 1;
}

function quickSortIterative(arr) {
    // Make a copy of the array so we sort in place on the copy to mimic the functional behavior 
    // of the recursive one, or we can just sort in place. The lab expects returning a new array 
    // or mutating. Let's return a new array to be consistent with recursive one.
    const result = [...arr];
    
    let stack = new Array(result.length);
    let top = -1;
  
    stack[++top] = 0;
    stack[++top] = result.length - 1;
  
    while (top >= 0) {
        let high = stack[top--];
        let low = stack[top--];
  
        let p = partition(result, low, high);
  
        if (p - 1 > low) {
            stack[++top] = low;
            stack[++top] = p - 1;
        }
  
        if (p + 1 < high) {
            stack[++top] = p + 1;
            stack[++top] = high;
        }
    }
    
    return result;
}

module.exports = quickSortIterative;
