CREATE TABLE users (
	id TEXT UNIQUE NOT NULL,
	name TEXT NOT NULL,
	tel TEXT NOT NULL,
	registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	# 这里加一个UUID
);

CREATE TABLE time_capsules (
	sender_id TEXT NOT NULL,
	receiver_name TEXT NOT NULL,
	receiver_tel TEXT NOT NULL,
	period TEXT NOT NULL,
	type TEXT NOT NULL,
	from_qrcode BOOLEAN NOT NULL,
	message TEXT,
	file_id TEXT,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_capsules (
	sender_id TEXT NOT NULL,
	period TEXT NOT NULL,
	question TEXT NOT NULL,
	message TEXT NOT NULL,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE offline_capsules (
	sender_id TEXT NOT NULL,
	receiver_name TEXT NOT NULL,
	receiver_tel TEXT NOT NULL,
	receiver_addr TEXT NOT NULL,
	capsule_id TEXT NOT NULL,
	period TEXT NOT NULL,
	seal BOOLEAN NOT NULL,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
