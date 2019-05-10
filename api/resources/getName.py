from flask_restful import Resource, reqparse
from api.common.database import database
from api.common.utils import decodeUID

parser = reqparse.RequestParser()

parser.add_argument('uid', type = str, required = True)

class getName(Resource):
	def post(self):
		args = parser.parse_args()
		uid = decodeUID(args["uid"])
		if uid == -1:
			return {
				"ok": False,
				"error_code": 400,
				"description": "Invalid user id."
			}
		info = database.getInfoByUID(uid)
		if info is None:
			return {
				"ok": True,
				"record": False
			}
		return {
			"ok": True,
			"record": True,
			"name": info[1],
			"tel": info[2]
		}

