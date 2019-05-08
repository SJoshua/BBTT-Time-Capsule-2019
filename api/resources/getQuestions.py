from flask_restful import Resource
import json
import random

class getQuestions(Resource):
	def get(self):
		f = open("./config/questions.json", "r")
		r = f.read()
		f.close()
		ia = random.randint(0, len(r[0]))
		ib = random.randint(0, len(r[1]))
		ic = random.randint(0, len(r[2]))
		return {
			"ok": True,
			"question_list": {
				100 + ia: r[0][ia],
				200 + ib: r[1][ib],
				300 + ic: r[2][ic]
			}
		}
		