import mysql.connector
import json
from config.config import cfg

f = open("./config/questions.json", "r")
questions = json.loads(f.read())
f.close()

class database:
	def getCursor():
		con = mysql.connector.connect(
			host = cfg["host"],
			user = cfg["user"],
			passwd = cfg["passwd"],
			database = cfg["database"]
		)
		cur = con.cursor(prepared = True)
		cur.execute("SET NAMES 'utf8mb4'")
		cur.execute("SET CHARACTER SET 'utf8mb4'")
		return con, cur

	def getInfo(open_id):
		(con, cur) = database.getCursor()
		cur.execute("SELECT uid, name, tel FROM users WHERE open_id=?", [open_id])
		r = cur.fetchone()
		cur.close()
		con.close()
		if r is None:
			return None
		else:
			return [r[0], str(r[1], 'utf-8'), str(r[2], 'utf-8')]

	def getInfoByUID(uid):
		(con, cur) = database.getCursor()
		cur.execute("SELECT uid, name, tel FROM users WHERE uid=?", [uid])
		r = cur.fetchone()
		cur.close()
		con.close()
		if r is None:
			return None
		else:
			return [r[0], str(r[1], 'utf-8'), str(r[2], 'utf-8')]

	def getStatistics(open_id):
		info = database.getInfo(open_id)
		(con, cur) = database.getCursor()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE sender_id = ?", [info[0]])
		sent = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE receiver_tel = ? and from_qrcode = 1", [info[2]])
		receive_qrcode = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE receiver_tel = ? and from_qrcode = 0", [info[2]])
		receive_tel = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM question_capsules WHERE sender_id = ?", [info[0]])
		answer = cur.fetchone()
		cur.close()
		con.close()
		return sent[0], receive_qrcode[0], receive_tel[0], answer[0]

	def getStatisticsByTel(tel):
		(con, cur) = database.getCursor()
		cur.execute("SELECT COUNT(*) FROM offline_capsules WHERE receiver_tel = ?", [tel])
		cnt = cur.fetchone()
		cur.close()
		con.close()
		return cnt[0]

	def getTimeCapsules():
		(con, cur) = database.getCursor()
		cur.execute("SELECT COUNT(*) FROM time_capsules")
		r = cur.fetchone()
		cur.close()
		con.close()
		return r[0]

	def getTagStatus(tag):
		(con, cur) = database.getCursor()
		cur.execute("SELECT COUNT(*) FROM offline_capsules where capsule_tag = ?", [tag])
		r = cur.fetchone()
		cur.close()
		con.close()
		if r[0] == 0:
			return True
		else:
			return False

	def insertInfo(open_id, name, tel):
		(con, cur) = database.getCursor()
		cur.execute("INSERT INTO users(open_id, name, tel) VALUES(?, ?, ?)", [open_id, name, tel])
		cur.close()
		con.commit()
		con.close()

	def addQuestionCapsule(open_id, period, question, message):
		info = database.getInfo(open_id)
		(con, cur) = database.getCursor()
		cur.execute("INSERT INTO question_capsules(sender_id, period, question, message) VALUES(?, ?, ?, ?)", [info[0], period, question, message])
		cur.close()
		con.commit()
		con.close()

	def addTimeCapsule(open_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id):
		info = database.getInfo(open_id)
		(con, cur) = database.getCursor()
		cur.execute("INSERT INTO time_capsules(sender_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [info[0], receiver_name, receiver_tel, type, period, from_qrcode, message, file_id])
		cur.close()
		con.commit()
		con.close()

	def addOfflineCapsule(sender_name, sender_tel, receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal):
		(con, cur) = database.getCursor()
		cur.execute("INSERT INTO offline_capsules(sender_name, sender_tel, receiver_name, receiver_tel, receiver_addr, capsule_tag, period, seal) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [sender_name,  sender_tel, receiver_name,  receiver_tel, receiver_addr, capsule_id, period, seal])
		cur.close()
		con.commit()
		con.close()
