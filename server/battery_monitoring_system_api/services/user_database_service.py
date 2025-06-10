from battery_monitoring_system_api.extensions import mongo

class UserDatabaseService:
    def __init__(self):
        self.database = mongo.db

    def get_one(self, user_id):
        data = self.database.user.find_one({"userId": user_id})
        if data:
            data.update({"_id": str(data.get("_id"))})
        return data

    def update_one(self, user_id, sensors):
        return self.database.user.update_one({"userId": user_id}, {"$set": {"sensors": sensors}})

    def create_one(self, user_id, email, sensors):
        return self.database.user.insert_one({"userId": user_id, "email": email, "sensors": sensors})