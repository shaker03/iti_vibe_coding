const quickSortRecursive = require('../algorithms/quicksortRecursive');
const quickSortIterative = require('../algorithms/quicksortIterative');
const mergeSort = require('../algorithms/mergeSort');

describe('Sorting Algorithms', () => {
    const algorithms = [
        { name: 'QuickSort (Recursive)', fn: quickSortRecursive },
        { name: 'QuickSort (Iterative)', fn: quickSortIterative },
        { name: 'MergeSort', fn: mergeSort }
    ];

    algorithms.forEach(({ name, fn }) => {
        describe(name, () => {
            test('should sort an array of numbers', () => {
                const arr = [5, 2, 9, 1, 5, 6];
                const sorted = fn([...arr]);
                expect(sorted).toEqual([1, 2, 5, 5, 6, 9]);
            });

            test('should handle an empty array', () => {
                const arr = [];
                const sorted = fn([...arr]);
                expect(sorted).toEqual([]);
            });

            test('should handle an array with one element', () => {
                const arr = [42];
                const sorted = fn([...arr]);
                expect(sorted).toEqual([42]);
            });

            test('should handle an already sorted array', () => {
                const arr = [1, 2, 3, 4, 5];
                const sorted = fn([...arr]);
                expect(sorted).toEqual([1, 2, 3, 4, 5]);
            });

            test('should handle an array with duplicate elements', () => {
                const arr = [3, 1, 2, 3, 1, 2];
                const sorted = fn([...arr]);
                expect(sorted).toEqual([1, 1, 2, 2, 3, 3]);
            });
            
            test('should handle an array with negative numbers', () => {
                const arr = [3, -1, 2, -3, 0];
                const sorted = fn([...arr]);
                expect(sorted).toEqual([-3, -1, 0, 2, 3]);
            });
        });
    });
});
