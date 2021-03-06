import uuid
import flask
import flask_restful
from flask_cors import CORS
from config.config import cfg
from api.resources.isOngoing import isOngoing
from api.resources.getName import getName
from api.resources.getInfo import getInfo
from api.resources.getQRCode import getQRCode
from api.resources.getQuestions import getQuestions
from api.resources.getStatistics import getStatistics
from api.resources.sendTimeCapsule import sendTimeCapsule
from api.resources.sendOfflineCapsule import sendOfflineCapsule
from api.resources.sendQuestionCapsule import sendQuestionCapsule
from api.resources.updateInfo import updateInfo

app = flask.Flask(__name__)

CORS(app, resources = r'/api/*', supports_credentials = True)

app.secret_key = cfg["secret_key"]

api = flask_restful.Api(app)

api.add_resource(isOngoing, '/api/isOngoing')
api.add_resource(getName, '/api/getName')
api.add_resource(getInfo, '/api/getInfo')
api.add_resource(getQRCode, '/api/getQRCode')
api.add_resource(getQuestions, '/api/getQuestions')
api.add_resource(getStatistics, '/api/getStatistics')
api.add_resource(sendTimeCapsule, '/api/sendTimeCapsule')
api.add_resource(sendOfflineCapsule, '/api/sendOfflineCapsule')
api.add_resource(sendQuestionCapsule, '/api/sendQuestionCapsule')
api.add_resource(updateInfo, '/api/updateInfo')

############################################################## TEST ONLY
class setSession(flask_restful.Resource):
	def get(self):
		if "open_id" not in flask.session:
			flask.session['open_id'] = "test_open_id_" + str(uuid.uuid4())
		return {
			"open_id": flask.session['open_id']
		}

api.add_resource(setSession, '/api/setSession')