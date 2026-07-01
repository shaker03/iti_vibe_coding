document.addEventListener('DOMContentLoaded', () => {
    const arrayInput = document.getElementById('arrayInput');
    const generateBtn = document.getElementById('generateBtn');
    const sortBtn = document.getElementById('sortBtn');
    const algorithmSelect = document.getElementById('algorithmSelect');
    const timeDisplay = document.getElementById('timeDisplay');
    const sortedText = document.getElementById('sortedText');
    const barsBefore = document.getElementById('arrayBarsBefore');
    const barsAfter = document.getElementById('arrayBarsAfter');

    // Initialize with some random numbers
    generateRandomArray();

    generateBtn.addEventListener('click', generateRandomArray);
    sortBtn.addEventListener('click', performSort);

    function generateRandomArray() {
        const arr = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100) + 1);
        arrayInput.value = arr.join(', ');
        renderBars(arr, barsBefore);
        barsAfter.innerHTML = ''; // Clear after
        sortedText.textContent = '-';
        timeDisplay.textContent = '0 ms';
    }

    arrayInput.addEventListener('input', () => {
        const arr = parseInput(arrayInput.value);
        if (arr.length > 0) {
            renderBars(arr, barsBefore);
        }
    });

    function parseInput(inputStr) {
        return inputStr.split(',')
            .map(s => s.trim())
            .filter(s => s !== '')
            .map(Number)
            .filter(n => !isNaN(n));
    }

    function renderBars(arr, container, isSorted = false) {
        container.innerHTML = '';
        if (arr.length === 0) return;
        
        const maxVal = Math.max(...arr, 1);
        
        arr.forEach(val => {
            const bar = document.createElement('div');
            bar.className = `bar ${isSorted ? 'sorted' : ''}`;
            // Calculate height percentage (min 10% to be visible)
            const heightPct = Math.max((val / maxVal) * 100, 10);
            bar.style.height = `${heightPct}%`;
            bar.title = val;
            container.appendChild(bar);
        });
    }

    async function performSort() {
        const arr = parseInput(arrayInput.value);
        if (arr.length === 0) {
            alert('Please enter some valid numbers');
            return;
        }

        const algorithm = algorithmSelect.value;

        // Visual cue that sorting is happening
        sortBtn.disabled = true;
        sortBtn.textContent = 'Sorting...';

        try {
            const response = await fetch('/api/sort', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ array: arr, algorithm })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Display results
            timeDisplay.textContent = `${data.executionTimeMs.toFixed(4)} ms`;
            sortedText.textContent = data.sortedArray.join(', ');
            renderBars(data.sortedArray, barsAfter, true);
            
        } catch (error) {
            console.error('Error during sorting:', error);
            alert('An error occurred during sorting.');
        } finally {
            sortBtn.disabled = false;
            sortBtn.textContent = 'Sort Data';
        }
    }
});
