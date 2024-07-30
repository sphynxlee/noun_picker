let currentHighlightedParagraph = null;
let previouslyUnderlinedParagraph = null;
let wordCountPopup = null;
// localhost
// const backendUrl = 'http://localhost:5000/process';
// PythonAnywhere
const backendUrl = 'https://kaitonri.pythonanywhere.com/process';

// Create the buttons once and reuse them
const selectButton = document.createElement('button');
selectButton.textContent = 'Select Text';
selectButton.classList.add('select-button');

const pinButton = document.createElement('button');
pinButton.textContent = 'Pin Text';
pinButton.classList.add('pin-button');

// Create and show the word count popup
function showWordCountPopup(text, x, y) {
    if (!wordCountPopup) {
        wordCountPopup = document.createElement('div');
        wordCountPopup.classList.add('word-count-popup');
        document.body.appendChild(wordCountPopup);
    }
    wordCountPopup.textContent = `Word Count: ${text.split(/\s+/).filter(word => word.length > 0).length}`;
    wordCountPopup.style.left = `${x}px`;
    wordCountPopup.style.top = `${y}px`;
    wordCountPopup.style.display = 'block';
}

function onSelectButtonClick() {
    const parentParagraph = selectButton.parentElement;
    if (parentParagraph && parentParagraph.tagName === 'P') {
        if (currentHighlightedParagraph === parentParagraph) {
            // Unselect the current paragraph
            parentParagraph.style.backgroundColor = '';
            currentHighlightedParagraph = null;
            selectButton.textContent = 'Select Text';
            if (wordCountPopup) wordCountPopup.style.display = 'none';
        } else {
            // Remove highlight from the previous paragraph
            if (currentHighlightedParagraph) {
                currentHighlightedParagraph.style.backgroundColor = '';
            }

            // Highlight the current paragraph
            parentParagraph.style.backgroundColor = 'yellow';

            // Update the current highlighted paragraph
            currentHighlightedParagraph = parentParagraph;
            selectButton.textContent = 'Unselect Text';

            // Show word count popup
            const rect = parentParagraph.getBoundingClientRect();
            showWordCountPopup(parentParagraph.textContent, rect.right + 10, rect.top);
        }
    }
}

function onPinButtonClick() {
    const parentParagraph = pinButton.parentElement;
    if (parentParagraph && parentParagraph.tagName === 'P') {
        // Pin text and send to backend
        fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: parentParagraph.textContent })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Processed text:', data);
                if (data.noun_phrases) {
                    // Remove  previous paragraph underlining
                    if (previouslyUnderlinedParagraph && previouslyUnderlinedParagraph !== parentParagraph) {
                        resetParagraphFormatting(previouslyUnderlinedParagraph);
                    }

                    // Underline the current paragraph
                    underlineNounPhrases(parentParagraph, data.noun_phrases);

                    // Update the previously underlined paragraph
                    previouslyUnderlinedParagraph = parentParagraph;
                }
            });
    }
}

function underlineNounPhrases(paragraph, nounPhrases) {
    let paragraphHTML = paragraph.innerHTML;

    // Sort noun phrases by length, descending, to avoid partial matching issues
    nounPhrases.sort((a, b) => b.length - a.length);

    nounPhrases.forEach(phrase => {
        // Create a regular expression for the phrase, ensuring full-word match
        const regex = new RegExp(`\\b(${phrase})\\b`, 'g');
        paragraphHTML = paragraphHTML.replace(regex, '<span class="underline">$1</span>');
    });

    paragraph.innerHTML = paragraphHTML;
}

// Reset paragraph formatting to remove underlines
function resetParagraphFormatting(paragraph) {
    // Remove any span elements with the underline class and restore original text
    paragraph.innerHTML = paragraph.textContent;
}

// Attach event listeners to buttons
selectButton.addEventListener('click', onSelectButtonClick);
pinButton.addEventListener('click', onPinButtonClick);

document.addEventListener('mouseover', function (event) {
    if (event.target.tagName === 'P') {
        if (selectButton.parentElement !== event.target) {
            event.target.appendChild(selectButton);
            event.target.appendChild(pinButton);

            if (currentHighlightedParagraph === event.target) {
                selectButton.textContent = 'Unselect Text';
            } else {
                selectButton.textContent = 'Select Text';
            }

            // If moving to a new paragraph, reset previous underlining if necessary
            if (previouslyUnderlinedParagraph && previouslyUnderlinedParagraph !== event.target) {
                resetParagraphFormatting(previouslyUnderlinedParagraph);
                previouslyUnderlinedParagraph = null; // Clear the reference since the underlining is removed
            }
        }
    }
});

// Clean everything to prevent potential memory leaks
window.addEventListener('unload', function () {
    selectButton.removeEventListener('click', onSelectButtonClick);
    pinButton.removeEventListener('click', onPinButtonClick);
    if (wordCountPopup) {
        document.body.removeChild(wordCountPopup);
        wordCountPopup = null;
    }
});
