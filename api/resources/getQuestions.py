from flask_restful import Resource
from api.common.database import questions
import json
import random

class getQuestions(Resource):
	def get(self):
		ia = random.randint(0, len(questions[0]) - 1)
		ib = random.randint(0, len(questions[1]) - 1)
		ic = random.randint(0, len(questions[2]) - 1)
		return {
			"ok": True,
			"question_list": {
				100 + ia: questions[0][ia],
				200 + ib: questions[1][ib],
				300 + ic: questions[2][ic]
			}
		}
		