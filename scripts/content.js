document.addEventListener('mouseover', function (event) {
    if (event.target.tagName === 'P') {
        // Insert interactive elements
        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select Text';
        event.target.appendChild(selectButton);

        const pinButton = document.createElement('button');
        pinButton.textContent = 'Pin Text';
        event.target.appendChild(pinButton);

        // Add event listeners
        selectButton.addEventListener('click', function () {
            // Highlight text
            event.target.style.backgroundColor = 'yellow';
        });

        pinButton.addEventListener('click', function () {
            // Pin text and send to backend
            fetch('http://localhost:5000/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: event.target.textContent })
            })
                .then(response => response.json())
                .then(data => {
                    // Display processed data (e.g., underlined noun phrases)
                    console.log(data);
                });
        });
    }
});
