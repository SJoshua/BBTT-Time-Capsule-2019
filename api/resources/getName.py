from flask_restful import Resource, reqparse, abort
from api.common.database import database
from api.common.utils import decodeUID

parser = reqparse.RequestParser()

parser.add_argument('uid', type = str, required = True)

class getName(Resource):
	def post(self):
		args = parser.parse_args()
		uid = decodeUID(args["uid"])
		if uid == -1:
			abort(400, message = "Invalid user id.")
		info = database.getInfoByUID(uid)
		if info is None:
			return {
				"record": False
			}
		return {
			"record": True,
			"name": info[1],
			"tel": info[2]
		}

