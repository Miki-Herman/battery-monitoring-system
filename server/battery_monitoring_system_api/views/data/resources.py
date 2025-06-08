from flask.views import MethodView
from flask_smorest import Blueprint

from battery_monitoring_system_api.protected_view import ProtectedView
from battery_monitoring_system_api.views.schemas import create_error_schema
from battery_monitoring_system_api.views.data.schemas import BatteryDataSchema, BatteryQuerySchema
from pymongo.errors import ConnectionFailure

blp = Blueprint('data', 'data', url_prefix="/data")


@blp.route('/submit')
class SubmitResource(MethodView):

    @blp.doc(security=[])
    @blp.arguments(BatteryDataSchema, location='json')
    def post(self, battery_data):

        from battery_monitoring_system_api.di import battery_database_service
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
        object_id: str = query.get('id')
        system_id: str = query.get('system_id')

        if object_id:
            from battery_monitoring_system_api.di import battery_database_service
            try:
                battery_data = battery_database_service.get_one(object_id, system_id)
                return {"error":create_error_schema(0), "message": "Data retrieved successfully", "result": battery_data}, 200
            except ConnectionFailure as e:
                return {"error":create_error_schema(2), "message": "Failed to retrieve data"}, 500
            except Exception as e:
                return {"error":create_error_schema(1), "message": str(e)}, 500

        else:
            from battery_monitoring_system_api.di import battery_database_service
            try:
                battery_data = battery_database_service.get_all_by_key("system_id", system_id)
                return {"error":create_error_schema(0), "message": "Data retrieved successfully", "result": battery_data}, 200
            except ConnectionFailure as e:
                return {"error":create_error_schema(2), "message": "Failed to retrieve data"}, 500
            except Exception as e:
                return {"error":create_error_schema(1), "message": str(e)}, 500


