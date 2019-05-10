from flask import request, Response, make_response, session
from flask_restful import Resource
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
				r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo", cookies = dict(PHPSESSID = sess_id))
				try:
					t = json.loads(r)
					if "open_id" in t:
						session["open_id"] = t["open_id"]
				except:
					pass
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		info = database.getInfo(session["open_id"])
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
