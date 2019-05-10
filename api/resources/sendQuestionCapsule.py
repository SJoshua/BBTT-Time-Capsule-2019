from flask import session
from flask_restful import Resource, reqparse
from api.common.database import database, questions

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
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		info = database.getInfo(session["open_id"])
		if info is None:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please update information first."
			}
		args = parser.parse_args()
		try:
			q = int(args["question"])
			cid = q // 100
			qid = q % 100
			if ((cid != 1 and cid != 2 and cid != 3) or qid < 0 or qid >= len(questions[cid - 1])):
				return {
					"ok": False,
					"error_code": 400,
					"description": "Invaild question id."
				}
		except:
			return {
				"ok": False,
				"error_code": 400,
				"description": "Invaild parameters."
			}
		database.addQuestionCapsule(session["open_id"], args["period"], args["question"], args["message"])
		return {
			"ok": True
		}