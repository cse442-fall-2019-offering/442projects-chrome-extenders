# documentation for using oxford dictionary api
# for protoptyping from https://developer.oxforddictionaries.com/documentation#/Entries

import requests
import os
import json
from config import *


def get_definitions(word):
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

    if "error" in data:
        def_array = {}
        return def_array

    # definitions
    senses_array = data['results'][0]['lexicalEntries'][0]['entries'][0]['senses']

    # put all defintions into array
    definitions_array = []
    for i in senses_array:
        definitions_array.append(str(i['definitions'][0]))

    def_kvp = {"defintions": definitions_array}

    # print(def_kvp)
    return def_kvp


def get_synonyms_and_antonyms(word):
    thesaurus_kvp = {}
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

    if "error" in data:
        t_array = {}
        return t_array

    senses_array = data['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]
    synonyms = []
    antonyms = []

    if 'synonyms' in senses_array:
        for i in senses_array['synonyms']:
            synonyms.append(i['text'])

    thesaurus_kvp.update({"synonyms": synonyms})

    if 'antonyms' in senses_array:
        for i in senses_array['antonyms']:
            antonyms.append(i['text'])

    thesaurus_kvp.update({"antonyms": antonyms})

    # print(thesaurus_kvp)
    return thesaurus_kvp


def get_example(word):
    example_kvp = {}

    app_id = d_app_id
    app_key = d_app_key

    endpoint = 'sentences'
    language = 'en-us'
    word_id = word
    strictMatch = 'false'

    url = 'https://od-api.oxforddictionaries.com/api/v2/' + endpoint + '/' + language + \
        '/' + word_id.lower() + '?strictMatch=' + strictMatch

    r = requests.get(url, headers={'app_id': app_id, 'app_key': app_key})
    data = json.loads(r.text)

    if "error" in data:
        ex_array = {}
        return ex_array

    one_example = [str(data['results'][0]['lexicalEntries']
                       [0]['sentences'][0]['text'])]

    example_kvp = {"example": one_example}
    # print(example_kvp)
    return example_kvp

# puts all of the returned data into one data struct to be called by word_request.py


def results(word):
    results = {}
    if get_definitions(word) == {}:
        return {}

    results.update(get_definitions(word))
    results.update(get_synonyms_and_antonyms(word))
    results.update(get_example(word))
    results.update(translation_request(word))
    print(results)
    return results


def translation_request(word):

    header = {
        'Ocp-Apim-Subscription-Key': azure_key,
        'Content-Type': 'application/json; charset=UTF-8'
    }

    # translations come in the order: spanish, french, italian
    url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=es&to=fr&to=it&to=nl&to=de&to=da&to=ar&to=zh-Hans&to=ja&to=tlh&textType=html'

    data = '[{"Text": "%s"}]' % word
    # print(data)

    r = requests.post(url, data=data, headers=header)
    translation_json = json.loads(r.text)

    spanish = translation_json[0]['translations'][0]['text']
    french = translation_json[0]['translations'][1]['text']
    italian = translation_json[0]['translations'][2]['text']
    dutch = translation_json[0]['translations'][3]['text']
    german = translation_json[0]['translations'][4]['text']
    russian = translation_json[0]['translations'][5]['text']
    arabic = translation_json[0]['translations'][6]['text']
    chinese = translation_json[0]['translations'][7]['text']
    japanese = translation_json[0]['translations'][8]['text']
    lang_kvp = {"spanish": spanish, "french": french, "italian": italian, "dutch": dutch,
                "german": german, "russian": russian, "arabic": arabic, "chinese": chinese, "japanese": japanese}

    languages = {"languages": lang_kvp}
    # translations_kvp = {"translations":}
    return languages
