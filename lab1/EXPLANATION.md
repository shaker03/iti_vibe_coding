# Algorithm Explanations & Development Process

## How QuickSort Works
QuickSort is a Divide and Conquer algorithm. It picks an element as a "pivot" and partitions the given array around the picked pivot.
1. **Choose Pivot:** We usually pick the last element as the pivot, though random or median pivots are also viable.
2. **Partitioning:** Rearrange the array so that all elements smaller than the pivot are on the left, and all elements greater are on the right. The pivot is then in its final sorted position.
3. **Recursion:** Recursively apply the above steps to the sub-array of elements with smaller values and the sub-array of elements with greater values.

## Complexity Analysis

### Time Complexity:
- **Best / Average Case:** O(N log N) - occurs when the partition process always picks the middle element as pivot.
- **Worst Case:** O(N^2) - occurs when the partition process always picks the greatest or smallest element as pivot (e.g. array is already sorted and we pick the last element).

### Space Complexity:
- **Recursive QuickSort:** O(log N) average, O(N) worst case due to the recursion stack.
- **Iterative QuickSort:** O(N) explicit stack space in the worst case to keep track of sub-arrays.

## Comparison with Other Sorting Algorithms

- **MergeSort:** 
  - Time Complexity: O(N log N) in all cases.
  - Space Complexity: O(N).
  - *Comparison:* MergeSort is highly reliable (guaranteed O(N log N)) and stable, but QuickSort is often faster in practice due to better cache locality and being an in-place sort (mostly). 
- **HeapSort:** 
  - Time Complexity: O(N log N).
  - Space Complexity: O(1).
  - *Comparison:* HeapSort uses less space than MergeSort, but in practice, QuickSort is generally faster.
- **Built-in `Array.prototype.sort()`:** 
  - In V8 (Node.js/Chrome), the built-in sort is highly optimized (TimSort), which adapts to the data and generally outperforms naive QuickSort and MergeSort implementations.

## Copilot Assisted Development Log (Simulated)

**Assistance Highlights:**
- **Code Generation:** Copilot efficiently generated the base structure of the recursive QuickSort.
- **Iterative Enhancement:** When asked to optimize to prevent stack overflow on deep arrays, Copilot suggested the Iterative approach using an explicit Stack.
- **Debugging:** During testing, Copilot helped spot the issue with `Array.prototype.sort()` sorting numbers alphabetically by default (e.g. `[1, 10, 2]`), prompting the addition of the comparator `(a, b) => a - b`.
- **Testing:** Copilot Chat effortlessly scaffolded Jest tests for various edge cases like negative numbers, duplicates, and empty arrays.
- **UI Generation:** Copilot generated a clean HTML boilerplate, which was then styled with modern CSS features (glassmorphism).

**Key Learnings:**
- AI significantly speeds up writing boilerplate algorithms and tests.
- Always review the AI's edge-case handling (e.g., empty arrays, already sorted arrays).
