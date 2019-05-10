import mysql.connector
from config.config import cfg

con = mysql.connector.connect(
	host = cfg["host"],
	user = cfg["user"],
	passwd = cfg["passwd"],
	database = cfg["database"]
)

class database:
	def getInfo(open_id):
		cur = con.cursor(prepared = True)
		cur.execute("SELECT * FROM users WHERE open_id=?", [open_id])
		r = cur.fetchone()
		cur.close()
		return r

	def getStatistics(open_id):
		info = getInfo(open_id)
		cur = con.cursor(prepared = True)
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE sender_id=?", [info[0]])
		sent = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE receiver_tel=? and from_qrcode=1", [info[2]])
		receive_qrcode = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE receiver_tel=? and from_qrcode=0", [info[2]])
		receive_tel = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM question_capsules WHERE sender_id=?", [info[0]])
		answer = cur.fetchone()
		cur.close()
		return sent[0], receive_qrcode[0], receive_tel[0], answer[0]

	def getTimeCapsules():
		cur = con.cursor(prepared = True)
		cur.execute("SELECT COUNT(*) FROM time_capsules")
		r = cur.fetchone()
		cur.close()
		return r[0]

	def insertInfo(open_id, name, tel):
		cur = con.cursor(prepared = True)
		cur.execute("INSERT INTO users(open_id, name, tel) VALUES(?, ?, ?)", [open_id, name, tel])
		cur.close()
		con.commit()

	def addQuestionCapsule(open_id, period, question, message):
		info = getInfo(open_id)
		cur = db.cursor(prepared = True)
		cur.execute("INSERT INTO question_capsules(sender_id, period, question, message) VALUES(?, ?, ?, ?)", [info[0], period, question, message])
		cur.close()
		con.commit()

	def addTimeCapsule(open_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id):
		info = getInfo(open_id)
		cur = db.cursor(prepared = True)
		cur.execute("INSERT INTO time_capsules(sender_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", [info[0], receiver_name, receiver_tel, type, period, from_qrcode, message, file_id])
		cur.close()
		con.commit()

	def addOfflineCapsule(open_id, receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal):
		info = getInfo(open_id)
		cur = db.cursor(prepared = True)
		cur.execute("INSERT INTO offline_capsules(sender_id, receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal) VALUES(?, ?, ?, ?, ?, ?, ?)", [info[0], receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal])
		cur.close()
		con.commit()
