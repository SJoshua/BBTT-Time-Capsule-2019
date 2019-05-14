from flask import session, request
from flask_restful import Resource, reqparse, inputs, abort
from api.common.database import database
from api.common.utils import checkTag, checkTime, checkTel
import json
import requests

'''
### sendOfflineCapsule
Use this method to send offline capsule.

HTTP Request Method: **POST**

| Field         | Type    | Required | Description                                                    |
|---------------|---------|----------|----------------------------------------------------------------|
| sender_name   | String  | Yes      | Sender's name.                                                 |
| sender_tel    | String  | Yes      | Sender's telephone number.                                     |
| receiver_name | String  | Yes      | Receiver's name.                                               |
| receiver_tel  | String  | Yes      | Receiver's telephone number.                                   |
| receiver_addr | String  | Yes      | Receiver's address.                                            |
| capsule_tag   | String  | Yes      | The tag ID attached on the envelope.                           |
| period        | String  | Yes      | The period of time capsule. Must be `half-year` or `one-year`. |
| seal          | Boolean | Yes      | Whether the seal is required.                                  |
'''

parser = reqparse.RequestParser()

parser.add_argument('sender_name', type = str, required = True)
parser.add_argument('sender_tel', type = str, required = True)
parser.add_argument('receiver_name', type = str, required = True)
parser.add_argument('receiver_tel', type = str, required = True)
parser.add_argument('receiver_addr', type = str, required = True)
parser.add_argument('capsule_tag', type = str, required = True)
parser.add_argument('period', type = str, required = True, choices = ('half-year', 'one-year'))
parser.add_argument('seal', type = inputs.boolean, required = True)

class sendOfflineCapsule(Resource):
	def post(self):
		if checkTime() != 0:
			abort(416, message = "Event is not ongoing.")
		args = parser.parse_args()
		if not checkTel(args["sender_tel"]) or not checkTel(args["receiver_tel"]):
			abort(400, message = "Invalid telephone number.")
		if checkTag(args["capsule_tag"]) == False:
			abort(400, message = "Invalid capsule tag.")
		if not database.getTagStatus(args["capsule_tag"]):
			abort(409, message = "The capsule tag already exists.")
		database.addOfflineCapsule(args["sender_name"], args["sender_tel"],  args["receiver_name"], args["receiver_tel"], args["receiver_addr"], args["capsule_tag"], args["period"], args["seal"])
		return {
			"receiver_name": args["receiver_name"],
			"count": database.getStatisticsByTel(args["receiver_tel"])
		}