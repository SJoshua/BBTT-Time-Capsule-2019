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

	def addTimeCapsule(sender_id, receiver_name, receiver_tel, type, period, message, signature, vocative, file_id):
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("INSERT INTO time_capsules(sender_id, period, question, message) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [sender_id, receiver_name, receiver_tel, type, period, message, signature, vocative, file_id])
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
