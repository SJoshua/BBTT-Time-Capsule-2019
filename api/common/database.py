import mysql.connector
import json
from config.config import cfg

con = mysql.connector.connect(
	host = cfg["host"],
	user = cfg["user"],
	passwd = cfg["passwd"],
	database = cfg["database"]
)

f = open("./config/questions.json", "r")
questions = json.loads(f.read())
f.close()

class database:
	def getInfo(open_id):
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("SELECT uid, name, tel FROM users WHERE open_id=?", [open_id])
		r = cur.fetchone()
		cur.close()
		if r is None:
			return None
		else:
			return [r[0], str(r[1], 'utf-8'), str(r[2], 'utf-8')]

	def getInfoByUID(uid):
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("SELECT uid, name, tel FROM users WHERE uid=?", [uid])
		r = cur.fetchone()
		cur.close()
		if r is None:
			return None
		else:
			return [r[0], str(r[1], 'utf-8'), str(r[2], 'utf-8')]

	def getStatistics(open_id):
		info = database.getInfo(open_id)
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE sender_id = ?", [info[0]])
		sent = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE receiver_tel = ? and from_qrcode = 1", [info[2]])
		receive_qrcode = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE receiver_tel = ? and from_qrcode = 0", [info[2]])
		receive_tel = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM question_capsules WHERE sender_id = ?", [info[0]])
		answer = cur.fetchone()
		cur.close()
		return sent[0], receive_qrcode[0], receive_tel[0], answer[0]

	def getTimeCapsules():
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("SELECT COUNT(*) FROM time_capsules")
		r = cur.fetchone()
		cur.close()
		return r[0]

	def getTagStatus(tag):
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("SELECT COUNT(*) FROM offline_capsules where capsule_tag = ?", [tag])
		r = cur.fetchone()
		cur.close()
		if r[0] == 0:
			return True
		else:
			return False

	def insertInfo(open_id, name, tel):
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("INSERT INTO users(open_id, name, tel) VALUES(?, ?, ?)", [open_id, name, tel])
		cur.close()
		con.commit()

	def addQuestionCapsule(open_id, period, question, message):
		info = database.getInfo(open_id)
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("INSERT INTO question_capsules(sender_id, period, question, message) VALUES(?, ?, ?, ?)", [info[0], period, question, message])
		cur.close()
		con.commit()

	def addTimeCapsule(open_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id):
		info = database.getInfo(open_id)
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("INSERT INTO time_capsules(sender_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [info[0], receiver_name, receiver_tel, type, period, from_qrcode, message, file_id])
		cur.close()
		con.commit()

	def addOfflineCapsule(open_id, receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal):
		info = database.getInfo(open_id)
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8'")
		cur.execute("SET CHARACTER SET 'utf8'")
		cur.execute("INSERT INTO offline_capsules(sender_id, receiver_name, receiver_tel, receiver_addr, capsule_tag, period, seal) VALUES(?, ?, ?, ?, ?, ?, ?)", [info[0], receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal])
		cur.close()
		con.commit()
