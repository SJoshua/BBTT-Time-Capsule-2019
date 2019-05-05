from flask_restful import Resource
import json

class getQuestions(Resource):
	def get(self):
		f = open("./config/questions.json", "r")
		r = f.read()
		f.close()
		return json.loads(r)