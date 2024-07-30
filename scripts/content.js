// Track the currently highlighted paragraph
let currentHighlightedParagraph = null;

// Create the buttons once and reuse them
const selectButton = document.createElement('button');
selectButton.textContent = 'Select Text';
selectButton.classList.add('select-button'); // Add a class for styling or querying

const pinButton = document.createElement('button');
pinButton.textContent = 'Pin Text';
pinButton.classList.add('pin-button'); // Add a class for styling or querying

// Function to handle selectButton clicks
function onSelectButtonClick() {
    const parentParagraph = selectButton.parentElement;
    if (parentParagraph && parentParagraph.tagName === 'P') {
        if (currentHighlightedParagraph === parentParagraph) {
            // Unselect the current paragraph
            parentParagraph.style.backgroundColor = '';
            currentHighlightedParagraph = null;
            selectButton.textContent = 'Select Text';
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
                // Display processed data (e.g., underlined noun phrases)
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
    }
});

// Clean up on page unload to prevent potential memory leaks
window.addEventListener('unload', function () {
    selectButton.removeEventListener('click', onSelectButtonClick);
    pinButton.removeEventListener('click', onPinButtonClick);
});
