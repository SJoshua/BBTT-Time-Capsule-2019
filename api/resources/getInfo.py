from flask import request, Response, make_response, session
from flask_restful import Resource
from api.common.database import database
import os
import time
import phpserialize

class getInfo(Resource):
	def get(self):
		if "open_id" not in session:
			session_content = ""
			if "session_id" in request.cookies:
				session_file = "%ssess_%s" % ("/var/tmp/", request.cookies.get("session_id"))
				if os.path.exists(session_file):
					f = open(session_file)
					session_content = f.read()
			if session_content:
				session_list = session_content.split("|")
				if session_list[0]:
					ret = phpserialize.loads(session_list[1])
					if "open_id" in ret:
						session["open_id"] = user_info["open_id"]

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
