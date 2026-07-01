const express = require('express');
const path = require('path');
const { performance } = require('perf_hooks');

const quickSortRecursive = require('./algorithms/quicksortRecursive');
const quickSortIterative = require('./algorithms/quicksortIterative');
const mergeSort = require('./algorithms/mergeSort');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/sort', (req, res) => {
    const { array, algorithm } = req.body;

    if (!Array.isArray(array)) {
        return res.status(400).json({ error: 'Input must be an array of numbers' });
    }

    let sortFn;
    switch (algorithm) {
        case 'quickSortRecursive':
            sortFn = quickSortRecursive;
            break;
        case 'quickSortIterative':
            sortFn = quickSortIterative;
            break;
        case 'mergeSort':
            sortFn = mergeSort;
            break;
        case 'builtIn':
            sortFn = (arr) => {
                const copy = [...arr];
                return copy.sort((a, b) => a - b);
            };
            break;
        default:
            return res.status(400).json({ error: 'Unknown algorithm' });
    }

    try {
        const start = performance.now();
        const sortedArray = sortFn(array);
        const end = performance.now();

        res.json({
            sortedArray,
            executionTimeMs: end - start,
            algorithm
        });
    } catch (error) {
        res.status(500).json({ error: 'Sorting failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
