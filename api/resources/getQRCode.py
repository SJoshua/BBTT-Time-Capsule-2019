from flask import session
from flask_restful import Resource
import qrcode
import base64

class getQRCode(Resource):
	def get(self):
		if "open_id" not in session:
			return {
				"ok": False,
				"error_code": 403,
				"description": "Please bind Wechat account first."
			}
		url = "https://hemc.100steps.net/2019/time-capsule/QR.html?uid=" # to-do
		qrcode.make(url).save("qrcode.png")
		f = open("qrcode.png", "rb")
		image = base64.b64encode(f.read())
		f.close()
		return {
			"ok": True,
			"image": "data:image/png;base64," + image
		}