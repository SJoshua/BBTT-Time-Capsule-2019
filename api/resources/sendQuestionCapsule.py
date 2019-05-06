from flask import session
from flask_restful import Resource, reqparse
from api.common.database import database

'''
### sendQuestionCapsule
Use this method to send question capsule.

HTTP Request Method: **POST**

| Field       | Type   | Required | Description                                                    |
|-------------|--------|----------|----------------------------------------------------------------|
| period      | String | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| question    | String | Yes      | The id of selected question. Such as `1-1`.                    |
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
		args = parser.parse_args()
		database.addTimeCapsule(session["open_id"], args["receiver_name"], args["receiver_tel"], args["type"], args["period"], args["message"], args["signature"], args["vocative"], args["file_id"])
		return {
			"ok": True
		}