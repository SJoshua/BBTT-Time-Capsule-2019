from flask import session
from flask_restful import Resource
from api.common.database import database

class getInfo(Resource):
	def get(self):
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		info = database.getInfo()
		if info is None:
			return {
				"ok": True,
				"record": False
			}
		else:
			return {
				"ok": True,
				"record": True,
				"name": info[1]
			}
