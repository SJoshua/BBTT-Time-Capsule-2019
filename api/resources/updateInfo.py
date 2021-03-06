from flask import session, request
from flask_restful import Resource, reqparse, abort
from api.common.database import database
from api.common.utils import checkTel
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
					t = json.loads(r.text)
					if "openid" in t:
						session["open_id"] = t["openid"]
				except:
					pass
		if "open_id" not in session:
			abort(401, message = "Please bind Wechat account first.")
		args = parser.parse_args()
		if not checkTel(args["tel"]):
			abort(400, message = "Invalid telephone number.")
		ret = database.getInfo(session["open_id"])
		if ret is not None:
			abort(409, message = "User already exists.")
		database.insertInfo(session["open_id"], args["name"], args["tel"])
		return {}