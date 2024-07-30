// Track the currently highlighted paragraph and popup
let currentHighlightedParagraph = null;
let wordCountPopup = null;

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

// Handle selectButton clicks
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

// Function to handle pinButton clicks
function onPinButtonClick() {
    const parentParagraph = pinButton.parentElement;
    if (parentParagraph && parentParagraph.tagName === 'P') {
        // Pin text and send to backend
        fetch('http://localhost:5000/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: parentParagraph.textContent })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    }
}

// Attach event listeners to buttons
selectButton.addEventListener('click', onSelectButtonClick);
pinButton.addEventListener('click', onPinButtonClick);

// Event listener for mouseover on the document
document.addEventListener('mouseover', function (event) {
    if (event.target.tagName === 'P') {
        // Move the buttons to the new paragraph
        event.target.appendChild(selectButton);
        event.target.appendChild(pinButton);

        // Update the selectButton text based on the currently highlighted paragraph
        if (currentHighlightedParagraph === event.target) {
            selectButton.textContent = 'Unselect Text';
        } else {
            selectButton.textContent = 'Select Text';
        }
    }
});

// Clean up on page unload to prevent potential memory leaks
window.addEventListener('unload', function () {
    selectButton.removeEventListener('click', onSelectButtonClick);
    pinButton.removeEventListener('click', onPinButtonClick);
    if (wordCountPopup) {
        document.body.removeChild(wordCountPopup);
        wordCountPopup = null;
    }
});
