# documentation for using oxford dictionary api
# for protoptyping from https://developer.oxforddictionaries.com/documentation#/Entries

import requests
import os
import json
from config import *
import pprint


def get_definitions_for_imput_word_in_terminal(w):
    word = w
    # word = input("Enter word you'd like to get the defintion of: ")
    print(word + '\n' + 'definitions:')

    app_id = d_app_id
    app_key = d_app_key

    endpoint = 'entries'
    language = 'en-us'
    word_id = word
    fields = 'definitions'
    strictMatch = 'false'

    url = 'https://od-api.oxforddictionaries.com/api/v2/' + endpoint + '/' + language + \
        '/' + word_id.lower() + '?fields=' + fields + '&strictMatch=' + strictMatch

    r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
    data = json.loads(r.text)

    senses_array = data['results'][0]['lexicalEntries'][0]['entries'][0]['senses']

    definitions_array = []
    for i in senses_array:
        definitions_array.append(i['definitions'][0])

    print(definitions_array)

    return 0


def get_synonyms(w):
    word = w
    print('synonyms:')

    app_id = d_app_id
    app_key = d_app_key

    endpoint = 'thesaurus'
    language = 'en-us'
    word_id = word
    fields = 'synonyms'
    strictMatch = 'false'

    url = 'https://od-api.oxforddictionaries.com/api/v2/' + endpoint + '/' + language + \
        '/' + word_id.lower() + '?fields=' + fields + '&strictMatch=' + strictMatch

    r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
    data = json.loads(r.text)

    senses_array = data['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['synonyms']

    synonyms_array = []
    for i in senses_array:
        synonyms_array.append(i['text'])

    print(synonyms_array)

    return 0


def get_antonyms():
    return 0


def get_example():
    return 0
