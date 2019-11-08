import requests
import os
import json
from config import azure_key


def request():

    word = input("Input word here: ")

    header = {
        'Ocp-Apim-Subscription-Key': azure_key,
        'Content-Type': 'application/json; charset=UTF-8'
    }

    # translations come in the order: spanish, french, italian
    url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=es&to=fr&to=it'

    data = '[{"Text": "%s"}]' % word
    print(data)

    response = requests.post(url, data=data, headers=header)
    print(response.text)
    return response


if __name__ == "__main__":
    # Launch main menu
    request()
