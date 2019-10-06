import sys
sys.path.insert(1, "../api")
import api

if __name__ == "__main__":
    word = input("Enter word you'd like to get the defintion of: ")
    api.get_definitions(word)
    # api.get_synonyms_and_antonyms(word)
    # api.get_example(word)
