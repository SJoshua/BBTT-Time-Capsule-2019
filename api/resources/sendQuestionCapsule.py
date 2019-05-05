from flask_restful import Resource

class sendQuestionCapsule(Resource):
	def get(self):
		return {'error': 'Supports POST only.'}
	def post(self):
		pass