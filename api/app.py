from flask import Flask
from flask_restful import Api
from api.resources.getInfo import getInfo
from api.resources.getQRCode import getQRCode
from api.resources.getQuestions import getQuestions
from api.resources.getStatistics import getStatistics
from api.resources.sendTimeCapsule import sendTimeCapsule
from api.resources.sendOfflineCapsule import sendOfflineCapsule
from api.resources.sendQuestionCapsule import sendQuestionCapsule
from api.resources.updateInfo import updateInfo

app = Flask(__name__)
api = Api(app)

api.add_resource(getInfo, '/api/getInfo')
api.add_resource(getQRCode, '/api/getQRCode')
api.add_resource(getQuestions, '/api/getQuestions')
api.add_resource(getStatistics, '/api/getStatistics')
api.add_resource(sendTimeCapsule, '/api/sendTimeCapsule')
api.add_resource(sendOfflineCapsule, '/api/sendOfflineCapsule')
api.add_resource(sendQuestionCapsule, '/api/sendQuestionCapsule')
api.add_resource(updateInfo, '/api/updateInfo')

