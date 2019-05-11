from flask import session, request
from flask_restful import Resource, reqparse, inputs, abort
from api.common.database import database
from api.common.utils import checkTag
import json
import requests

'''
### sendOfflineCapsule
Use this method to send offline capsule.

HTTP Request Method: **POST**

| Field         | Type    | Required | Description                                                    |
|---------------|---------|----------|----------------------------------------------------------------|
| receiver_name | String  | Yes      | Receiver's name.                                               |
| receiver_tel  | String  | Yes      | Receiver's telephone number.                                   |
| receiver_addr | String  | Yes      | Receiver's address.                                            |
| capsule_tag   | String  | Yes      | The tag ID attached on the envelope.                           |
| period        | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| seal          | Boolean | Yes      | Whether the seal is required.                                  |
'''

parser = reqparse.RequestParser()

parser.add_argument('receiver_name', type = str, required = True)
parser.add_argument('receiver_tel', type = str, required = True)
parser.add_argument('receiver_addr', type = str, required = True)
parser.add_argument('capsule_tag', type = str, required = True)
parser.add_argument('period', type = str, required = True, choices = ('half-year', 'one-year'))
parser.add_argument('seal', type = inputs.boolean, required = True)

class sendOfflineCapsule(Resource):
	def post(self):
		if "open_id" not in session:
			sess_id = request.cookies.get("PHPSESSID")
			if sess_id is not None:
				r = requests.get("https://hemc.100steps.net/2017/wechat/Home/Index/getUserInfo", timeout = 5, cookies = dict(PHPSESSID = sess_id))
				try:
					t = json.loads(r)
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
		if checkTag(args["capsule_tag"]) == False:
			abort(400, message = "Invaild capsule tag.")
		if not database.getTagStatus(args["capsule_tag"]):
			abort(409, message = "The capsule tag already exists.")
		database.addOfflineCapsule(session["open_id"], args["receiver_name"], args["receiver_tel"], args["receiver_addr"], args["capsule_tag"], args["period"], args["seal"])
		return {
			"receiver_name": args["receiver_name"],
			"count": database.getStatisticsByTel(args["receiver_tel"])
		}