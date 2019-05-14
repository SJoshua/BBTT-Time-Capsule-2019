from flask import session, request
from flask_restful import Resource, reqparse, abort
from api.common.database import database, questions
from api.common.utils import checkTime
import json
import requests

'''
### sendQuestionCapsule
Use this method to send question capsule.

HTTP Request Method: **POST**

| Field       | Type   | Required | Description                                                    |
|-------------|--------|----------|----------------------------------------------------------------|
| period      | String | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| question    | String | Yes      | The id of selected question. Such as `101`.                    |
| message     | String | Yes      | The answer to selected question.                               |
'''

parser = reqparse.RequestParser()

parser.add_argument('period', type = str, required = True, choices = ('half-year', 'one-year'))
parser.add_argument('message', type = str, required = True)
parser.add_argument('question', type = str, required = True)

class sendQuestionCapsule(Resource):
	def post(self):
		if checkTime() != 0:
			abort(416, message = "Event is not ongoing.")
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
			abort(403, message = "Please update information first.")
		args = parser.parse_args()
		try:
			q = int(args["question"])
			cid = q // 100
			qid = q % 100
			if ((cid != 1 and cid != 2 and cid != 3) or qid < 0 or qid >= len(questions[cid - 1])):
				abort(400, message = "Invaild question id.")
		except:
			abort(400, message = "Invaild parameter: question.")
		database.addQuestionCapsule(session["open_id"], args["period"], args["question"], args["message"])
		return {}