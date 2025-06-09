from flask import current_app
from battery_monitoring_system_api.services.battery_database_service import BatteryDatabaseService
from battery_monitoring_system_api.services.user_database_service import UserDatabaseService

config = current_app.config
connection_string = config.get("DATABASE_CONN_STR", "")
error_map = config.get("ERROR_MAP", {})
google_client_id = config.get("GOOGLE_CLIENT_ID", "")


private_key = config.get("JWT_PRIVATE_KEY", "")
algorithm = config.get("JWT_ALGORITHM", "")

battery_database_service = BatteryDatabaseService()
user_database_service = UserDatabaseService()

