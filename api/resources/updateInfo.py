from flask import session
from flask_restful import Resource, reqparse
from api.common.database import database

'''
### updateInfo
Use this method to update user's info.

HTTP Request Method: **POST**

| Field | Type   | Required | Description              |
|-------|--------|----------|--------------------------|
| name  | String | Yes      | User's name.             |
| tel   | String | Yes      | User's telephone number. |
'''
parser = reqparse.RequestParser()

parser.add_argument('name', type = str, required = True)
parser.add_argument('tel', type = str, required = True)

class updateInfo(Resource):
	def post(self):
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		args = parser.parse_args()
		database.insertInfo(session["open_id"], args["name"], args["tel"])
		return {
			"ok": True
		}
