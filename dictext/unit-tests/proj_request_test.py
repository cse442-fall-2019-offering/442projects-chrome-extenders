import requests
import os
import json


def project_request(word_id):
    word_id = "word"
    url = "http://127.0.0.1:5000/api/" + word_id
    r = requests.get(url)

    return r
