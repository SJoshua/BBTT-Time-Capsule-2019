from flask import session
from flask_restful import Resource, reqparse
from api.common.database import database

'''
### sendOfflineCapsule
Use this method to send offline capsule.

HTTP Request Method: **POST**

| Field         | Type    | Required | Description                                                    |
|---------------|---------|----------|----------------------------------------------------------------|
| receiver_name | String  | Yes      | Receiver's name.                                               |
| receiver_tel  | String  | Yes      | Receiver's telephone number.                                   |
| receiver_addr | String  | Yes      | Receiver's address.                                            |
| capsule_id    | String  | Yes      | The ID attached on the envelope.                               |
| period        | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| seal          | Boolean | Yes      | Whether the seal is required.                                  |
'''

parser = reqparse.RequestParser()

parser.add_argument('receiver_name', type = str, required = True)
parser.add_argument('receiver_tel', type = str, required = True)
parser.add_argument('receiver_addr', type = str, required = True)
parser.add_argument('capsule_id', type = str, required = True)
parser.add_argument('period', type = str, required = True, choices = ('half-year', 'one-year'))
parser.add_argument('seal', type = bool, required = True)

class sendOfflineCapsule(Resource):
	def post(self):
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		args = parser.parse_args()
		database.addOfflineCapsule(session["open_id"], args["receiver_name"], args["receiver_tel"], args["receiver_addr"], args["capsule_id"], args["period"], args["seal"])
		return {
			"ok": True
		}