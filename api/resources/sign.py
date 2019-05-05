from flask_restful import Resource

class sign(Resource):
	def get(self):
		return {'error': 'Supports POST only.'}
	def post(self):
		return {'error': 'Supports GET only.'}
