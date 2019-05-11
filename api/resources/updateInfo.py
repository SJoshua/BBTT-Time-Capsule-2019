from flask import session, request
from flask_restful import Resource, reqparse
from api.common.database import database
import json
import requests

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
			sess_id = request.cookies.get("PHPSESSID")
			if sess_id is not None:
				r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo", timeout = 5, cookies = dict(PHPSESSID = sess_id))
				try:
					t = json.loads(r)
					if "openid" in t:
						session["open_id"] = t["openid"]
				except:
					pass
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		args = parser.parse_args()
		ret = database.getInfo(session["open_id"])
		if ret is not None:
			return {
				"ok": False,
				"error_code": 403,
				"description": "User already exists."
			}
		database.insertInfo(session["open_id"], args["name"], args["tel"])
		return {
			"ok": True
		}
