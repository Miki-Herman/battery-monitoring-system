from battery_monitoring_system_api.extensions import mongo

class UserDatabaseService:
    def __init__(self):
        self.database = mongo.db

    def get_one(self, user_id):
        return self.database.find_one({"userId": user_id})

    def update_one(self, user_id, sensors):
        return self.database.update_one({"userId": user_id}, {"$set": {"sensors": sensors}})

    def create_one(self, user_id, email, sensors):
        return self.database.insert_one({"userId": user_id, "email": email, "sensors": sensors})