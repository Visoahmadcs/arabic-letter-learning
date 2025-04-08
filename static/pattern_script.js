// Arabic letters for the game
const arabicLetters = [
    'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر',
    'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف',
    'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'
];

let targetLetter = '';
let selectedCells = new Set();

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



function handleCellClick(cell) {
    if (cell.textContent === targetLetter) {
        cell.classList.add('correct');
        setTimeout(() => {
            startNewRound();
        }, 1000);
    } else {
        cell.classList.add('error');
        setTimeout(() => {
            cell.classList.remove('error');
        }, 500);
    }
}

function startNewRound() {
    // Get the grid container
    const gridContainer = document.querySelector('.pattern-grid');
    gridContainer.innerHTML = '';

    // Select new target letter
    targetLetter = arabicLetters[Math.floor(Math.random() * arabicLetters.length)];
    document.getElementById('target-letter').textContent = targetLetter;

    // Create array with target letter and random other letters
    let letters = [targetLetter];
    const otherLetters = arabicLetters.filter(l => l !== targetLetter);
    letters = letters.concat(shuffleArray(otherLetters).slice(0, 8));
    letters = shuffleArray(letters);

    // Create grid cells directly in the container
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = letters[i];
        cell.addEventListener('click', () => handleCellClick(cell));
        gridContainer.appendChild(cell);
    }
}

// Event Listeners
document.getElementById('next-letter').addEventListener('click', startNewRound);

// Start the game
window.addEventListener('load', startNewRound);

