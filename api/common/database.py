import sqlite3
from config.config import cfg

class database:
	def init_db():
		f = open("./api/sql/schema.sql", "r")
		sql = f.read()
		f.close()

		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.executescript(sql)
		cur.close()
		con.close()

	def getInfo(open_id):
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("SELECT * FROM users WHERE id=?", [open_id])
		r = cur.fetchone()
		cur.close()
		con.close()
		return r

	def getStatistics(open_id):
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("SELECT * FROM users WHERE id=?", [open_id])
		r = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE sender_id=?", [open_id])
		sent = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE receiver_tel=? and from_qrcode=1", [open_id])
		receive_qrcode = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM time_capsules WHERE receiver_tel=? and from_qrcode=0", [open_id])
		receive_tel = cur.fetchone()
		cur.execute("SELECT COUNT(*) FROM question_capsules WHERE sender_id=?", [open_id])
		answer = cur.fetchone()
		cur.close()
		con.close()
		return sent[0], receive_qrcode[0], receive_tel[0], answer[0]

	def getTimeCapsules():
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("SELECT COUNT(*) FROM time_capsules")
		r = cur.fetchone()
		cur.close()
		con.close()
		return r[0]

	def insertInfo(open_id, name, tel):
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("INSERT INTO users(id, name, tel) VALUES(?, ?, ?)", [open_id, name, tel])
		cur.close()
		con.commit()
		con.close()

	def addQuestionCapsule(sender_id, period, question, message):
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("INSERT INTO question_capsules(sender_id, period, question, message) VALUES(?, ?, ?, ?)", [sender_id, period, question, message])
		cur.close()
		con.commit()
		con.close()

	def addTimeCapsule(sender_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id):
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("INSERT INTO time_capsules(sender_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)", [sender_id, receiver_name, receiver_tel, type, period, from_qrcode, message, file_id])
		cur.close()
		con.commit()
		con.close()

	def addOfflineCapsule(sender_id, receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal):
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("INSERT INTO offline_capsules(sender_id, receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal) VALUES(?, ?, ?, ?, ?, ?, ?)", [sender_id, receiver_name, receiver_tel, receiver_addr, capsule_id, period, seal])
		cur.close()
		con.commit()
		con.close()
