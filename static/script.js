// Arabic letters data with their forms
const arabicLetters = [
    {
                name: "Alif",
                isolated: "ا",
                initial: "ا",
                medial: "ـا",
                final: "ـا"
            },
            {
                name: "Ba",
                isolated: "ب",
                initial: "بـ",
                medial: "ـبـ",
                final: "ـب"
            },
            {
                name: "Ta",
                isolated: "ت",
                initial: "تـ",
                medial: "ـتـ",
                final: "ـت"
            },
            {
                name: "Tha",
                isolated: "ث",
                initial: "ثـ",
                medial: "ـثـ",
                final: "ـث"
            },
            {
                name: "Jim",
                isolated: "ج",
                initial: "جـ",
                medial: "ـجـ",
                final: "ـج"
            },
            {
                name: "Ha",
                isolated: "ح",
                initial: "حـ",
                medial: "ـحـ",
                final: "ـح"
            },
            {
                name: "Kha",
                isolated: "خ",
                initial: "خـ",
                medial: "ـخـ",
                final: "ـخ"
            },
            {
                name: "Dal",
                isolated: "د",
                initial: "د",
                medial: "ـد",
                final: "ـد"
            },
            {
                name: "Dhal",
                isolated: "ذ",
                initial: "ذ",
                medial: "ـذ",
                final: "ـذ"
            },
            {
                name: "Ra",
                isolated: "ر",
                initial: "ر",
                medial: "ـر",
                final: "ـر"
            },
            {
                name: "Zay",
                isolated: "ز",
                initial: "ز",
                medial: "ـز",
                final: "ـز"
            },
            {
                name: "Sin",
                isolated: "س",
                initial: "سـ",
                medial: "ـسـ",
                final: "ـس"
            },
            {
                name: "Shin",
                isolated: "ش",
                initial: "شـ",
                medial: "ـشـ",
                final: "ـش"
            },
            {
                name: "Sad",
                isolated: "ص",
                initial: "صـ",
                medial: "ـصـ",
                final: "ـص"
            },
            {
                name: "Dad",
                isolated: "ض",
                initial: "ضـ",
                medial: "ـضـ",
                final: "ـض"
            },
            {
                name: "Ta (emphatic)",
                isolated: "ط",
                initial: "طـ",
                medial: "ـطـ",
                final: "ـط"
            },
            {
                name: "Zha",
                isolated: "ظ",
                initial: "ظـ",
                medial: "ـظـ",
                final: "ـظ"
            },
            {
                name: "Ayn",
                isolated: "ع",
                initial: "عـ",
                medial: "ـعـ",
                final: "ـع"
            },
            {
                name: "Ghayn",
                isolated: "غ",
                initial: "غـ",
                medial: "ـغـ",
                final: "ـغ"
            },
            {
                name: "Fa",
                isolated: "ف",
                initial: "فـ",
                medial: "ـفـ",
                final: "ـف"
            },
            {
                name: "Qaf",
                isolated: "ق",
                initial: "قـ",
                medial: "ـقـ",
                final: "ـق"
            },
            {
                name: "Kaf",
                isolated: "ك",
                initial: "كـ",
                medial: "ـكـ",
                final: "ـك"
            },
            {
                name: "Lam",
                isolated: "ل",
                initial: "لـ",
                medial: "ـلـ",
                final: "ـل"
            },
            {
                name: "Mim",
                isolated: "م",
                initial: "مـ",
                medial: "ـمـ",
                final: "ـم"
            },
            {
                name: "Nun",
                isolated: "ن",
                initial: "نـ",
                medial: "ـنـ",
                final: "ـن"
            },
            {
                name: "Ha (letter)",
                isolated: "ه",
                initial: "هـ",
                medial: "ـهـ",
                final: "ـه"
            },
            {
                name: "Waw",
                isolated: "و",
                initial: "و",
                medial: "ـو",
                final: "ـو"
            },
            {
                name: "Ya",
                isolated: "ي",
                initial: "يـ",
                medial: "ـيـ",
                final: "ـي"
            },
    // ... (all the letters data)
];

// Game state
let currentLetter = null;
let foundForms = new Set();
let gameActive = false;

// Initialize the game
function initializeGame() {
    const stripsContainer = document.getElementById('strips-container');
    stripsContainer.innerHTML = ''; // Clear existing strips
    
    // Update button text
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.textContent = 'Start New';
    resetBtn.style.display = 'none'; // Hide initially
    
    // Create strips for each form type
    const formTypes = ['isolated', 'initial', 'medial', 'final'];
    formTypes.forEach(formType => {
        const strip = document.createElement('div');
        strip.className = 'letter-strip';
        strip.setAttribute('data-form-type', formType);
        
        const title = document.createElement('div');
        title.className = 'strip-title';
        title.textContent = formType.charAt(0).toUpperCase() + formType.slice(1);
        strip.appendChild(title);
        
        // Create and shuffle letters for this form
        const letters = arabicLetters.map(letter => ({
            letter: letter[formType],
            name: letter.name,
            formType: formType
        }));
        shuffleArray(letters);
        
        letters.forEach(letterData => {
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter';
            letterDiv.textContent = letterData.letter;
            letterDiv.setAttribute('data-letter-name', letterData.name);
            letterDiv.setAttribute('data-form-type', letterData.formType);
            letterDiv.addEventListener('click', () => checkLetterForm(letterData));
            strip.appendChild(letterDiv);
        });
        
        stripsContainer.appendChild(strip);
    });
}

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Celebration animation
function celebrateWin() {
    const selectedLetterDisplay = document.getElementById('selected-letter-display');
    const selectedLetter = document.getElementById('selected-letter');
    const selectedLetterName = document.getElementById('selected-letter-name');
    
    // Add celebration class for animation
    selectedLetterDisplay.classList.add('celebrating');
    selectedLetter.classList.add('letter-celebration');
    
    // Update congratulation message
    selectedLetterName.innerHTML = `
        <div class="celebration-text">
            <span>🎉</span> Amazing! You've mastered the letter ${currentLetter.name}! <span>🎉</span>
        </div>
    `;
    
    // Show the Start New button
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.style.display = 'block';
    
    // Hide the next button
    document.getElementById('next-btn').style.display = 'none';
}

// Check if the clicked letter is correct
function checkLetterForm(letterData) {
    if (!gameActive) return;
    
    if (letterData.name === currentLetter.name) {
        // Mark as found
        foundForms.add(letterData.formType);
        
        // Highlight correct letter
        document.querySelectorAll(`.letter[data-letter-name="${letterData.name}"][data-form-type="${letterData.formType}"]`)
            .forEach(el => el.classList.add('correct'));
        
        // Check if all forms are found
        if (foundForms.size === 4) {
            gameActive = false;
            celebrateWin();
        }
    }
}

// Start new game
function startNewGame() {
    foundForms.clear();
    gameActive = true;
    
    // Reset celebration styles
    const selectedLetterDisplay = document.getElementById('selected-letter-display');
    const selectedLetter = document.getElementById('selected-letter');
    selectedLetterDisplay.classList.remove('celebrating');
    selectedLetter.classList.remove('letter-celebration');
    
    // Select random letter
    currentLetter = arabicLetters[Math.floor(Math.random() * arabicLetters.length)];
    
    // Update display
    const selectedLetterDiv = document.getElementById('selected-letter');
    const selectedLetterName = document.getElementById('selected-letter-name');
    selectedLetterDiv.textContent = currentLetter.isolated;
    selectedLetterName.textContent = `Find all forms of: ${currentLetter.name}`;
    
    // Initialize strips
    initializeGame();
    
    // Reset any previous styling
    document.querySelectorAll('.letter').forEach(letter => {
        letter.classList.remove('correct');
    });
    
    // Show next button, hide reset button initially
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('reset-btn').style.display = 'none';
}

// Event listeners
document.getElementById('next-btn').addEventListener('click', startNewGame);
document.getElementById('reset-btn').addEventListener('click', startNewGame);

// Start the game when the page loads
window.addEventListener('load', startNewGame);
