import sys
sys.path.insert(1, "../api")
import api

if __name__ == "__main__":

    # check if keysmashing doens't break code :)
    i = input("Input word here: ")
    a = api.get_definitions(i)
    print(a)


    word = "different"

    # defintions test
    definition = [
        'not the same as another or each other; unlike in nature, form, or quality', 'distinct; separate']
    d = api.get_definitions(word)
    if d["defintions"] == definition:
        print("defintion passed")
    else:
        print("definition failed")

    # get sysnonyms test
    synonyms = ['dissimilar', 'unalike', 'unlike', 'non-identical',
                'contrasting', 'divergent', 'disparate', 'poles apart']
    antonyms = ['similar']
    t = api.get_synonyms_and_antonyms(word)
    if t["synonyms"] == synonyms:
        print("synonyms passed")
    else:
        print("synonyms failed")

    if t["antonyms"] == antonyms:
        print("antonyms passed")
    else:
        print("antonyms failed")

    # get one example test
    example = [
        "It's very different from here, and high on the list of reasons why I need to move to a big city soon."]
    e = api.get_example(word)
    if e["example"] == example:
        print("example passed")
    else:
        print("example failed")

    # get all requests in single data struct
    api.results(word)
