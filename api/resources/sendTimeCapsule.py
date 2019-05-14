from flask import session, request
from flask_restful import Resource, reqparse, inputs, abort
from api.common.database import database
from api.common.utils import checkTime
from config.config import cfg
import hashlib
import base64
import json
import requests

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
parser.add_argument('from_qrcode', type = inputs.boolean, required = True)
parser.add_argument('message', type = str)
parser.add_argument('file_id', type = str)

class sendTimeCapsule(Resource):
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
		if args["type"] == "text":
			if args["message"] is None:
				abort(400, message = "Missing parameter: message.")
			else:
				database.addTimeCapsule(session["open_id"], args["receiver_name"], args["receiver_tel"], args["type"], args["period"], args["from_qrcode"], args["message"], None)
		elif args["type"] == "voice":
			if args["file_id"] is None:
				abort(400, message = "Missing parameter: file_id.")
			else:
				r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Public/getMedia?media_id=%s" % args["file_id"], timeout = 20)
				try: 
					t = json.loads(r.text)
					if t["status"] == 0:
						f = open("media/%s.amr" % hashlib.md5(args["file_id"].encode(encoding = 'UTF-8')).hexdigest(), "wb")
						f.write(base64.b64decode(t["data"]))
						f.close()
						database.addTimeCapsule(session["open_id"], args["receiver_name"], args["receiver_tel"], args["type"], args["period"], args["from_qrcode"], None, args["file_id"])
					else:
						abort(404, message = "Media not found.")
				except:
					abort(404, message = "Media not found.")
		return {
			"count": database.getTimeCapsules(),
			"period": args["period"],
			"name": info[1]
		}
