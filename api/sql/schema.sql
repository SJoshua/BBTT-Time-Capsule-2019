CREATE TABLE users (
	id TEXT UNIQUE NOT NULL,
	name TEXT,
	tel TEXT,
	registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE time_capsules (
	sender_id TEXT NOT NULL,
	receiver_name TEXT NOT NULL,
	receiver_tel TEXT NOT NULL,
	period TEXT NOT NULL,
	type TEXT NOT NULL,
	message TEXT,
	signature TEXT,
	vocative TEXT,
	file_id TEXT,
	created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_capsules (
	sender_id TEXT NOT NULL,
	period TEXT NOT NULL,
	question TEXT NOT NULL,
	message TEXT NOT NULL,
	created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE offline_capsules (
	sender_id TEXT NOT NULL,
	receiver_name TEXT NOT NULL,
	receiver_tel TEXT NOT NULL,
	receiver_addr TEXT NOT NULL,
	capsule_id TEXT NOT NULL,
	period TEXT NOT NULL,
	seal BOOLEAN NOT NULL,
	created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
