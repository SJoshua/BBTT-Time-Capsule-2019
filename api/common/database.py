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

	def updateInfo(open_id, name, tel):
		con = sqlite3.connect(cfg['db_name'])
		cur = con.cursor()
		cur.execute("INSERT INTO users VALUES(?, ?, ?)", [open_id, name, tel])
		cur.close()
		con.close()
