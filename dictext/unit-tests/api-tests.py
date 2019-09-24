# documentation for using oxford dictionary api
# for protoptyping from https://developer.oxforddictionaries.com/documentation#/Entries

import requests
import os
import json
from config import *


def get_definitions_for_imput_word_in_terminal():

    word = input("Enter word you'd like to get the defintion of: ")
    print(word)

    app_id = d_app_id
    app_key = d_app_key

    endpoint = 'entries'
    language = 'en-us'
    word_id = word
    fields = 'definitions'
    strictMatch = 'false'

    url = 'https://od-api.oxforddictionaries.com/api/v2/' + endpoint + '/' + language + \
        '/' + word_id.lower() + '?fields=' + fields

    # + '?fields=' + fields + '&strictMatch=' + strictMatch

    r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
    data = json.loads(r.text)

    # print(data)
    print(r.text)
    # print("code {}\n".format(r.status_code))
    # print("text \n" + r.text)
    # print("json \n" + json.dumps(r.json()))


if __name__ == "__main__":
    get_definitions_for_imput_word_in_terminal()
