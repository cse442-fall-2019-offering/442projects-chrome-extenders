import requests
import unirest
import json
from config import *


# This code uses an open-source library. http://unirest.io/python

def input_word():
    word = raw_input("Enter a word: ")    # for python 2 use raw_input()
    print('\n')
    print("Your input word is: ")
    print(word)
    return word

def main():

    # prompt for input
    word = input_word()

    url = api_url
    key = api_key

    # retrieve definitions
    response = unirest.get(url+word+"/definitions",
    headers={
        "X-Mashape-Key": api_key,
        "Accept": "application/json"
        }
    )

    # load data
    data = json.loads(response.raw_body)        # .raw_body is unparsed, error w .body
    print(data)


if __name__ == "__main__": main()
