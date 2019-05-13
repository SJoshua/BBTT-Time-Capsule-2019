from flask import request, Response, make_response, session
from flask_restful import Resource, abort
from api.common.database import database
import os
import time
import json
import requests

class getInfo(Resource):
	def get(self):
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
		info = database.getInfo(session["open_id"])
		if info is None:
			return {
				"record": False
			}
		else:
			return {
				"record": True,
				"name": info[1]
			}
