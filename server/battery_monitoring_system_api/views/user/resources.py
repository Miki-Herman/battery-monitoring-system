from flask.views import MethodView
from flask_smorest import Blueprint

from battery_monitoring_system_api.protected_view import ProtectedView
from battery_monitoring_system_api.views.schemas import create_error_schema
from battery_monitoring_system_api.views.user.schemas import UserDataSchema, UserUpdateSchema, UserQuerySchema
from pymongo.errors import ConnectionFailure

blp = Blueprint('user', 'user', url_prefix="/user")

@blp.route('')
class User(MethodView, ProtectedView):

    @blp.doc(security=[])
    @blp.arguments(UserQuerySchema, location='query')
    def get(self, query):
        user_id: str = query.get('userId')

        if user_id:
            from battery_monitoring_system_api.di import user_database_service
            try:
                user_data = user_database_service.get_one(user_id)
                return {"error":create_error_schema(0), "message": "Data retrieved successfully", "result": user_data}, 200
            except ConnectionFailure as e:
                return {"error":create_error_schema(2), "message": "Failed to retrieve data"}, 500
            except Exception as e:
                return {"error":create_error_schema(1), "message": str(e)}, 500

        else:
            return {"error":create_error_schema(0), "message": "User not found"}, 404

    @blp.doc(security=[])
    @blp.arguments(UserUpdateSchema, location='json')
    def put(self, update):
        user_id: str = update.get('userId')
        sensors = update.get('sensors')

        from battery_monitoring_system_api.di import user_database_service

        user_check = True if user_database_service.get_one(user_id) else False

        if user_check:
            try:
                user_database_service.update_one(user_id, sensors)
                return {"message": "Data updated successfully"}, 200

            except ConnectionFailure as e:
                return {"error":create_error_schema(2), "message": "Failed to update data"}, 500
            except Exception as e:
                return {"error":create_error_schema(1), "message": str(e)}, 500

        else:
            return {"error":create_error_schema(0), "message": "User not found"}, 404

    @blp.doc(security=[])
    @blp.arguments(UserDataSchema, location='json')
    def post(self, data):

        user_id = data.get('userId')
        email = data.get('email')
        sensors = data.get('sensors')

        from battery_monitoring_system_api.di import user_database_service

        try:
            user_database_service.create_one(user_id, email, sensors)
            return {"message": "Data updated successfully"}, 200

        except ConnectionFailure as e:
            return {"error":create_error_schema(2), "message": "Failed to update data"}, 500
        except Exception as e:
            return {"error":create_error_schema(1), "message": str(e)}, 500
