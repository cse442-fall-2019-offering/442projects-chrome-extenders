# using flask to setup api endpoints
# using tutorial from here: https://pypi.org/project/Flask/

from flask import Flask
app = Flask(__name__)


@app.route('/api/<word>')
def hello_world(word):
    return word
