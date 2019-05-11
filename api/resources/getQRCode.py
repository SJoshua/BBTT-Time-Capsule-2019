from flask import session, request
from flask_restful import Resource, abort
from api.common.database import database
from api.common.utils import encodeUID
from PIL import Image
import qrcode
import base64
import json
import requests

img_bg = Image.open("api/image/poster.png")

class getQRCode(Resource):
	def get(self):
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
		url = "https://hemc.100steps.net/2019/time-capsule/QR.html?uid=%s" % encodeUID(info[0])
		img_qr = qrcode.make(url, border = 2).resize((200, 200), Image.ANTIALIAS)
		pos = (img_bg.size[0] // 2 - img_qr.size[0] // 2, img_bg.size[1] - img_qr.size[1] * 2 - 10)
		img_bg.paste(img_qr, pos)
		img_bg.save("qrcode.jpg")
		f = open("qrcode.jpg", "rb")
		image = base64.b64encode(f.read())
		f.close()
		return {
			"image": "data:image/jpeg;base64," + str(image, 'utf-8')
		}