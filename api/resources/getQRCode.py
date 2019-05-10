from flask import session
from flask_restful import Resource
from api.common.database import database
from api.common.utils import encodeUID
from PIL import Image
import qrcode
import base64

img_bg = Image.open("api/image/poster.png")

class getQRCode(Resource):
	def get(self):
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
		url = "https://hemc.100steps.net/2019/time-capsule/QR.html?uid=%s" % encodeUID(info[0])
		img_qr = qrcode.make(url, border = 2).resize((200, 200), Image.ANTIALIAS)
		pos = (img_bg.size[0] // 2 - img_qr.size[0] // 2, img_bg.size[1] - img_qr.size[1] * 2 - 10)
		img_bg.paste(img_qr, pos)
		img_bg.save("qrcode.jpg")
		f = open("qrcode.jpg", "rb")
		image = base64.b64encode(f.read())
		f.close()
		return {
			"ok": True,
			"image": "data:image/jpeg;base64," + str(image, 'utf-8')
		}