from api import *

if __name__ == "__main__":
    word = input("Enter word you'd like to get the defintion of: ")
    get_definitions(word)
    get_synonyms_and_antonyms(word)
