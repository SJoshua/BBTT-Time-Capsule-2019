from config.config import cfg, mp_prime, ad_prime, fmp_prime, fad_prime, max_tag
import time

def encodeUID(id):
	return "%x" % (int(id) * mp_prime + ad_prime)

def decodeUID(uid):
	try:
		n = int(uid, 16) - ad_prime
		ret = n // mp_prime
		if ret * mp_prime != n:
			return -1
		else:
			return ret
	except:
		return -1

def checkTag(tag):
	try:
		n = int(tag, 16) - fad_prime
		tid = n // fmp_prime
		if tid * fmp_prime != n or tid < 1 or tid > max_tag:
			return False
		else:
			return True
	except:
		return False

def getTimestamp():
	return int(time.mktime(time.gmtime(time.time())) + 8 * 60 * 60)

def checkTime():
	status = 0
	cur = getTimestamp()
	if cur < cfg["begin"]:
		status = -1
	if cur > cfg["end"]:
		status = 1
	return status