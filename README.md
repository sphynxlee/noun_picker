# noun_picker
A Chrome extension is used for highlighting noun phrases.

## Reference
- [Chrome Extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world◊)
- [spacy model usage](https://spacy.io/usage)
- [spacy model demo](https://spacy.io)
- [PythonAnywhere](https://www.pythonanywhere.com/)

## Chrome Extension Installation
1. Clone the repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer mode
4. Click on `Load unpacked` and select the cloned repository
5. The extension is now installed

## Backend Installation (running on localhost)
1. Install the dependencies, `spacy`, `flask`, and `flask_cors`
2. Run the backend server using `python3 app.py`
3. The server is now running on `http://localhost:5000`

## Backend Installation (running on PythonAnywhere)
1. I had created an online webapp  on PythonAnywhere to host the backend server.
2. Check this [https://kaitonri.pythonanywhere.com/](https://kaitonri.pythonanywhere.com/) to see the server running.
3. Utilize the postman to test the server API as 'screenshots/pythonanywhere_spacy.png' screenshot shows.

## After setting up the extension and backend
1. pin the extension to the browser
2. Open a `https://developer.chrome.com/docs/extensions/*` page, and click on the extension icon
3. For example, load the extension on the `https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns` page


## Screenshots
![Screenshot](./screenshots/spacy.png)
This is a sceenshot of testing the spacy model on the backend server.

![Screenshot](./screenshots/select_text.png)
This is a screenshot of selecting text on the browser.

![Screenshot](./screenshots/noun_phrases.png)
This is a screenshot of the underline to the noun phrases on the browser.

![Screenshot](./screenshots/pythonanywhere_spacy.png)
This is a screenshot of the spacy model running on the pythonanywhere server.

![Screenshot](./screenshots/pythonanywhere_select_text.png)
Utilizing the spacy model on the pythonanywhere server to select text on the browser.