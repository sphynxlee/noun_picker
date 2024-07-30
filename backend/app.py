# ref: https://spacy.io/

# pip install -U spacy
# python -m spacy download en_core_web_sm
import spacy
from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
# Load English tokenizer, tagger, parser and NER
nlp = spacy.load("en_core_web_sm")

# test for backend server
@app.route('/')
def hello():
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    return f'Hello, Spacy! Current time is {current_time}.'

@app.route('/process', methods=['POST'])
def process_text():
    data = request.json
    text = data.get('text')

    doc = nlp(text)
    noun_phrases = [chunk.text for chunk in doc.noun_chunks]
    print('Noun Phrases:', noun_phrases)

    return jsonify(noun_phrases=noun_phrases)

if __name__ == '__main__':
    app.run()

