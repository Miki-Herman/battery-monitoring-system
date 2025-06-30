import jwt
from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint
from datetime import datetime, timedelta

from battery_monitoring_system_api.protected_view import ProtectedView
from battery_monitoring_system_api.views.schemas import create_error_schema
from battery_monitoring_system_api.views.data.schemas import BatteryDataSchema, BatteryQuerySchema
from pymongo.errors import ConnectionFailure

blp = Blueprint('data', 'data', url_prefix="/data")


@blp.route('/submit')
class SubmitResource(MethodView, ProtectedView):

    @blp.doc(security=[])
    @blp.arguments(BatteryDataSchema, location='json')
    def post(self, battery_data):
        from battery_monitoring_system_api.di import battery_database_service, public_key, algorithm

        jwt_token = request.headers.get('Authorization')
        decoded_token = jwt.decode(jwt_token, public_key, algorithms=[algorithm])

        role = decoded_token.get('role', "")

        if role != "gateway":
            return {"error":create_error_schema(4), "message": "Invalid token"}, 401

        try:
            battery_database_service.add(battery_data)
            return {"error":create_error_schema(0), "message": "Data submitted successfully"}, 201

        except ConnectionFailure as e:
            return {"error":create_error_schema(2), "message": "Failed to submit data"}, 500

        except Exception as e:
            return {"error":create_error_schema(1), "message": str(e)}, 500

@blp.route("")
class OutputResource(MethodView, ProtectedView):

    @blp.doc(security=[])
    @blp.arguments(BatteryQuerySchema, location='query')
    def get(self, query):

        two_months_ago = datetime.utcnow() - timedelta(days=60)

        system_id: str = query.get('systemId')
        timestamp: str = query.get('timestamp', int(two_months_ago.timestamp()))

        from battery_monitoring_system_api.di import battery_database_service, public_key, algorithm

        jwt_token = request.headers.get('Authorization')
        decoded_token = jwt.decode(jwt_token, public_key, algorithms=[algorithm])

        role = decoded_token.get('role', "")

        if role != "user":
            return {"error":create_error_schema(4), "message": "Invalid token"}, 401

        try:
            battery_data = battery_database_service.get_all_by_key("system_id", system_id, timestamp)
            return {"error":create_error_schema(0), "message": "Data retrieved successfully", "result": battery_data}, 200
        except ConnectionFailure as e:
            return {"error":create_error_schema(2), "message": "Failed to retrieve data"}, 500
        except Exception as e:
            return {"error":create_error_schema(1), "message": str(e)}, 500


