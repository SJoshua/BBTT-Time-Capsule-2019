# Carol primes
mp_prime = 16127
ad_prime = 3967

def encodeUID(id):
	return "%x" % (int(id) * mp_prime + ad_prime)

def decodeUID(uid):
	n = int(uid, 16) - ad_prime
	ret = n // mp_prime
	if n * mp_prime != ret:
		return -1
	else:
		return ret
