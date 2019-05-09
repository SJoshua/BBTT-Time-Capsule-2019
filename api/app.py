import flask
import flask_restful
from flask_cors import CORS
from api.resources.getInfo import getInfo
from api.resources.getQRCode import getQRCode
from api.resources.getQuestions import getQuestions
from api.resources.getStatistics import getStatistics
from api.resources.sendTimeCapsule import sendTimeCapsule
from api.resources.sendOfflineCapsule import sendOfflineCapsule
from api.resources.sendQuestionCapsule import sendQuestionCapsule
from api.resources.updateInfo import updateInfo

app = flask.Flask(__name__)

CORS(app)

app.secret_key = "dev"

api = flask_restful.Api(app)

api.add_resource(getInfo, '/api/getInfo')
api.add_resource(getQRCode, '/api/getQRCode')
api.add_resource(getQuestions, '/api/getQuestions')
api.add_resource(getStatistics, '/api/getStatistics')
api.add_resource(sendTimeCapsule, '/api/sendTimeCapsule')
api.add_resource(sendOfflineCapsule, '/api/sendOfflineCapsule')
api.add_resource(sendQuestionCapsule, '/api/sendQuestionCapsule')
api.add_resource(updateInfo, '/api/updateInfo')

def custom_abord(http_status_code, *args, **kwargs):
    if http_status_code == 400:
        flask.abort(400, {
        	"ok": False,
        	"error_code": 400,
        	"description": "Invaild parameter."
        })
    return flask.abort(http_status_code)

flask_restful.abort = custom_abord

##############################################################
class setSession(flask_restful.Resource):
	def get(self):
		if "open_id" not in flask.session:
			flask.session['open_id'] = "test_open_id"
			return {
				"ok": True,
				"open_id": flask.session['open_id']
			}
		else:
			return {
				"ok": False,
				"open_id": flask.session['open_id']
			}

api.add_resource(setSession, '/api/setSession')