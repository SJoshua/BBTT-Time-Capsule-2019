from flask import session
from flask_restful import Resource, reqparse
from api.common.database import database

'''
### sendTimeCapsule
Use this method to send time capsule. 

HTTP Request Method: **POST**

| Field         | Type    | Required | Description                                                    |
|---------------|---------|----------|----------------------------------------------------------------|
| receiver_name | String  | Yes      | Receiver's name.                                               |
| receiver_tel  | String  | Yes      | Receiver's telephone number.                                   |
| type          | String  | Yes      | The type of time capsule. Must be `text` or `voice`.           |
| period        | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| from_qrcode   | Boolean | Yes      | If the sender scanned a QR Code.                               |
| message       | String  | Optional | The message of time capsule.                                   |
| signature     | String  | Optional | The signature to time capsule.                                 |
| vocative      | String  | Optional | The vocative of receiver.                                      |
| file_id       | String  | Optional | The file id of recorded voice.                                 |

#### Response
| Field | Type    | Description                       |
|-------|---------|-----------------------------------|
| count | Integer | The number of sent time capsules. |

'''
parser = reqparse.RequestParser()

parser.add_argument('receiver_name', type = str, required = True)
parser.add_argument('receiver_tel', type = str, required = True)
parser.add_argument('type', type = str, required = True, choices = ('text', 'voice'))
parser.add_argument('period', type = str, required = True, choices = ('half-year', 'one-year'))
parser.add_argument('from_qrcode', type = bool, required = True)
parser.add_argument('message', type = str)
parser.add_argument('signature', type = str)
parser.add_argument('vocative', type = str)
parser.add_argument('file_id', type = str)

class sendTimeCapsule(Resource):
	def post(self):
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		args = parser.parse_args()
		if args["type"] == "text":
			if "message" not in args or "signature" not in args or "vocative" not in args:
				return {
					"ok": False,
					"error_code": 400,
					"description": "Invaild parameters."
				}
			else:
				database.addTimeCapsule(session["open_id"], args["receiver_name"], args["receiver_tel"], args["type"], args["period"], args["from_qrcode"], args["message"], args["signature"], args["vocative"], None)
		elif args["type"] == "voice":
			if "file_id" not in args:
				return {
					"ok": False,
					"error_code": 400,
					"description": "Invaild parameters."
				}
			else:
				database.addTimeCapsule(session["open_id"], args["receiver_name"], args["receiver_tel"], args["type"], args["period"], args["from_qrcode"], None, None, None, args["file_id"])
		return {
			"ok": True,
			"count": database.getTimeCapsules()
		}
