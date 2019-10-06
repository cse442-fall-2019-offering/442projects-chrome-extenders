# using flask to setup api endpoints
# using tutorial from here: https://pypi.org/project/Flask/

import sys
sys.path.insert(1, "../api")
import api

from flask import Flask
app = Flask(__name__)


@app.route('/api/<word>')
def get_word_data(word):
    return api.get_definitions(word)
