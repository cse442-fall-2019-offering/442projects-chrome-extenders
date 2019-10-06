import requests
import os
import json

def project_request(word_id):
    url = "http://127.0.0.1:5000/api/" + word_id
    r = requests.get(url)

    print(r.status_code)
    print(r.text)

    return 0
