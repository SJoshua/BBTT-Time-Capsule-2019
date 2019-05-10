import mysql.connector
from config.config import cfg

db = mysql.connector.connect(
	host = cfg["host"],
	user = cfg["user"],
	passwd = cfg["passwd"],
	database = cfg["database"]
)

cur = db.cursor()

cur.execute("CREATE TABLE `%s`.`users` ( `uid` INT NOT NULL AUTO_INCREMENT , `open_id` TEXT NOT NULL , `name` TEXT NOT NULL , `tel` TEXT NOT NULL , `registered` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`uid`)) ENGINE = InnoDB" % cfg["database"])
cur.execute("CREATE TABLE `%s`.`time_capsules` ( `capsule_id` INT NOT NULL AUTO_INCREMENT , `sender_id` INT NOT NULL , `receiver_name` TEXT NOT NULL , `receiver_tel` TEXT NOT NULL , `type` TEXT NOT NULL , `period` TEXT NOT NULL , `message` TEXT NULL , `file_id` TEXT NULL , `from_qrcode` BOOLEAN NOT NULL , `sent` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`capsule_id`)) ENGINE = InnoDB" % cfg["database"])
cur.execute("CREATE TABLE `%s`.`offline_capsules` ( `capsule_id` INT NOT NULL AUTO_INCREMENT , `sender_id` INT NOT NULL , `receiver_name` TEXT NOT NULL , `receiver_tel` TEXT NOT NULL , `receiver_addr` TEXT NOT NULL , `period` TEXT NOT NULL , `capsule_tag` TEXT NOT NULL , `seal` BOOLEAN NOT NULL , `sent` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`capsule_id`)) ENGINE = InnoDB" % cfg["database"])
cur.execute("CREATE TABLE `%s`.`question_capsules` ( `capsule_id` INT NOT NULL AUTO_INCREMENT , `sender_id` INT NOT NULL , `period` TEXT NOT NULL , `question` TEXT NOT NULL , `message` TEXT NOT NULL , `sent` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`capsule_id`)) ENGINE = InnoDB;" % cfg["database"])

print("done.")