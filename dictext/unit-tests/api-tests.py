# documentation for using oxford dictionary api
# for protoptyping from https://developer.oxforddictionaries.com/documentation#/Entries

import requests
import os
import json
from config import *
import pprint


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
        '/' + word_id.lower() + '?fields=' + fields + '&strictMatch=' + strictMatch

    # + '?fields=' + fields + '&strictMatch=' + strictMatch

    r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
    data = json.loads(r.text)
    # data = r.text

    senses_array = data['results'][0]['lexicalEntries'][0]['entries'][0]['senses']

    for i in senses_array:
        print(i['definitions'][0])
        print('\n')


if __name__ == "__main__":
    get_definitions_for_imput_word_in_terminal()
