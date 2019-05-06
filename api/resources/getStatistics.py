from flask import session
from flask_restful import Resource
from api.common.database import database

'''
### getStatistics
Use this method to get statistics of specified user.

Requires no parameters.

#### Response

| Field              | Type    | Description                                           |
|--------------------|---------|-------------------------------------------------------|
| sent               | Integer | The number of sent capsules.                          |
| received_by_qrcode | Integer | The number of received capsules via QR Code.          |
| received_by_tel    | Integer | The number of received capsules via telephone number. |
| answered           | Integer | The number of answers in Question Capsule.            |

'''

class getStatistics(Resource):
	def get(self):
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		(sent, received_by_qrcode, received_by_tel, answered) = database.getStatistics(session["open_id"])
		return {
			"ok": True,
			"sent": sent,
			"received_by_qrcode": received_by_qrcode,
			"received_by_tel": received_by_tel,
			"answered": answered
		}