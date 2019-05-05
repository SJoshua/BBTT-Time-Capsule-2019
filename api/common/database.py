import sqlite3
import config.config as cfg

class database:
	def get_db(self):
		con = sqlite3.connect(cfg.db_name)