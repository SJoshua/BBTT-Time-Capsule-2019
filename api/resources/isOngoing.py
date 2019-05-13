from flask_restful import Resource
from api.common.utils import checkTime
from config.config import cfg

class isOngoing(Resource):
	def get(self):
		return {
			"status": checkTime(),
			"begin": cfg["begin"],
			"end": cfg["end"]
		}