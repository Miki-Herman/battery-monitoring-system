from battery_monitoring_system_api.extensions import mongo

class UserDatabaseService:
    def __init__(self):
        self.database = mongo.db
