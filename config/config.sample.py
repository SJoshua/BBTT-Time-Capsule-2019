from api.common.utils import toTimestamp

cfg = {
	"host": "localhost",
	"user": "DATABASE_USERNAME",
	"passwd": "DATABASE_PASSWORD",
	"database": "DATABASE_NAME",
	"begin": toTimestamp("2019-05-14 20:00:00"),
	"end": toTimestamp("2020-05-14 19:59:59"),
	"secret_key": "dev"
}

mp_prime = 2
ad_prime = 2

fmp_prime = 2
fad_prime = 2

max_tag = 1600
