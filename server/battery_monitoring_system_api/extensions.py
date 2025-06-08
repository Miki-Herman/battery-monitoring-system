from flask_smorest import Api
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.server_api import ServerApi

api = Api(spec_kwargs={
    'security': [{"bearerAuth": []}],
    'components': {
        'securitySchemes': {
            'bearerAuth': {
                "type": "http",
                "description": "Enter JWT Bearer token",
                "scheme": "bearer",
                "bearerFormat": "JWT",
            }
        }
    }
})
cors = CORS()

class Mongo:

    def __init__(self):
        self.client = None
        self.db = None

    def init_app(self, app):
        self.client = MongoClient(app.config.get("DATABASE_CONN_STR", ""), server_api=ServerApi('1'))
        self.db = self.client["battery_monitoring_system"]

mongo = Mongo()
