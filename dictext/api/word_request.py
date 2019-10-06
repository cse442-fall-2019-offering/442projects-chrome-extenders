# using flask to setup api endpoints
# using tutorial from here: https://pypi.org/project/Flask/

import api

from flask import Flask
app = Flask(__name__)


@app.route('/api/<word>')
def get_word_data(word):
    return api.results(word)

@app.route('/api/definition/<word>')
def get_def(word):
    return api.get_definitions(word)

@app.route('/api/thesaurus/<word>')
def get_thesaurus(word):
    return api.get_synonyms_and_antonyms(word)

@app.route('/api/example/<word>')
def get_ex(word):
    return api.get_example(word)
