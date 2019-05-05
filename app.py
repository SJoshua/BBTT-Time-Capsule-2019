from flask import Flask
app = Flask(__name__)

@app.route('/api/sendTimeCapsule', methods=['post'])
def sendTimeCapsule():
	return 'API: sendTimeCapsule'
