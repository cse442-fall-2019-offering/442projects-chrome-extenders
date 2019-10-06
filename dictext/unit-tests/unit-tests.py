import sys
sys.path.insert(1, "../api")
import api
from proj_request_test import *

if __name__ == "__main__":
    word = "service"
    # api.get_definitions(word)
    # api.get_synonyms_and_antonyms(word)
    # api.get_example(word)
    # api.results(word)
    project_request(word)
