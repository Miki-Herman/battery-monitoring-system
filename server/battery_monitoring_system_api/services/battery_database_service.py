from bson.objectid import ObjectId
from battery_monitoring_system_api.extensions import mongo
from pymongo import ASCENDING

class BatteryDatabaseService:
    def __init__(self):
        self.database = mongo.db

    def get_one(self, object_id: str, system_id: str):
        data = self.database.battery_data.find_one({"_id": ObjectId(object_id), "system_id": system_id})
        return data

    def get_all_by_key(self, key, value):
        data = self.database.battery_data.find({key: value}).sort("timestamp", ASCENDING)
        result = []

        for data in data:
            json_data = {
                "_id": str(data.get("_id")),
                "system_id": data.get("system_id"),
                "timestamp": data.get("timestamp"),
                "temperature": data.get("temperature"),
                "current": data.get("current"),
                "voltage": data.get("voltage")
            }
            result.append(json_data)

        return result



    def add(self, data):
        result = self.database.battery_data.insert_one(data)
        return result.inserted_id

    def update(self, object_id: str, data):
        result = self.database.battery_data.update_one({"_id": ObjectId(object_id)}, {"$set": data})
        return result.modified_count

    def delete(self, object_id: str):
        result = self.database.battery_data.delete_one({"_id": ObjectId(object_id)})
        return result.deleted_count

