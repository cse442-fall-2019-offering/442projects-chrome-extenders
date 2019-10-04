# documentation for using oxford dictionary api
# for protoptyping from https://developer.oxforddictionaries.com/documentation#/Entries

import requests
import os
import json
from config import *
import pprint


def get_definitions(word):
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

    # definitions
    senses_array = data['results'][0]['lexicalEntries'][0]['entries'][0]['senses']

    # put all defintions into array
    definitions_array = []
    for i in senses_array:
        definitions_array.append(i['definitions'][0])

    print(definitions_array)

    return 0


def get_synonyms_and_antonyms(word):
    app_id = d_app_id
    app_key = d_app_key

    endpoint = 'thesaurus'
    language = 'en-us'
    word_id = word
    fields = 'synonyms'
    strictMatch = 'false'

    url = 'https://od-api.oxforddictionaries.com/api/v2/' + endpoint + '/' + language + \
        '/' + word_id.lower() + '?strictMatch=' + strictMatch

    r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
    data = json.loads(r.text)

    senses_array = data['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]
    synonyms = []
    antonyms = []

    if 'synonyms' in senses_array:
        for i in senses_array['synonyms']:
            synonyms.append(i['text'])

    if 'antonyms' in senses_array:
        for i in senses_array['antonyms']:
            antonyms.append(i['text'])

    print('synonyms')
    print(synonyms)
    print('antonyms')
    print(antonyms)

    # put them into respective arrays
    # synonyms_array = []
    # for i in s_senses_array:
    #     synonyms_array.append(i['text'])

    # antonyms_array = []
    # for i in a_senses_array:
    #     antonyms_array.append(i['text'])

    # print("synonyms:")
    # print(synonyms_array)
    # print("antonyms:")
    # print(antonyms_array)

    return 0


def get_antonyms(word):
    print('antonyms:')

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


def get_example():
    return 0
