import os
import time
from flask import request, Response, make_response, session
import phpserialize

php_session_path = "/var/tmp/"

def updateSession():
	session_content = ""
	if "session_id" in request.cookies:
		session_file = "%ssess_%s" % (php_session_path, request.cookies.get("session_id"))
		if os.path.exists(session_file):
			f = open(session_file)
			session_content = f.read()
	if session_content:
		session_list = session_content.split("|")
		if session_list[0]:
			ret = phpserialize.loads(session_list[1])
			if "open_id" in ret:
				session["open_id"] = user_info["open_id"]
