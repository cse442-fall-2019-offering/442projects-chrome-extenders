import sys
sys.path.insert(1, "../api")
import api

word = 'goodbye'
#get translation test
tr = api.translation_request(word)
print(tr)