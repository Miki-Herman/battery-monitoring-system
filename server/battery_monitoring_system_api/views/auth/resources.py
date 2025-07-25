from flask.views import MethodView
from flask_smorest import Blueprint

from google.oauth2 import id_token
from google.auth.transport import requests
import jwt
import datetime

from battery_monitoring_system_api.views.schemas import create_error_schema
from battery_monitoring_system_api.views.auth.schemas import AuthDataSchema, AuthGatewaySchema

blp = Blueprint('auth', 'auth', url_prefix="/auth")

@blp.route("")
class OutputResource(MethodView):

    @blp.doc(security=[])
    @blp.arguments(AuthDataSchema, location='json')
    def post(self, data):
        google_id = data.get('googleId', "")

        from battery_monitoring_system_api.di import google_client_id, private_key, algorithm
        try:
            id_info = id_token.verify_oauth2_token(google_id, requests.Request(), google_client_id)

            user_id = id_info.get("sub")
            email = id_info.get("email")
            name = id_info.get("name")

            payload = {
                "sub": user_id,
                "iat": datetime.datetime.utcnow(),
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
                "user_id": user_id,
                "email": email,
                "name": name,
                "role": ["user"]
            }

            token = jwt.encode(payload, private_key, algorithm=algorithm)
            return {"error":create_error_schema(0), "token": token}, 200

        except ValueError:
            return {"error":create_error_schema(4), "message": "Please enter valid token"}, 500


class GatewayAuthResource(MethodView):
    @blp.doc(security=[])
    @blp.arguments(AuthGatewaySchema, location='json')
    def post(self, data):
        gateway_token = data.get("token")

        from battery_monitoring_system_api.di import private_key, algorithm, gateway_key, gateway_algorithm
        try:
            jwt_token = jwt.decode(gateway_token, gateway_key, algorithm=gateway_algorithm)

            gateway_sub = jwt_token.get("sub")

            payload = {
                "sub": gateway_sub,
                "iat": datetime.datetime.utcnow(),
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
                "role": ["gateway"]
            }

            token = jwt.encode(payload, private_key, algorithm=algorithm)
            return {"error":create_error_schema(0), "token": token}, 200

        except jwt.InvalidTokenError:
            return {"error":create_error_schema(4), "message": "Invalid token"}, 401

        except ValueError:
            return {"error":create_error_schema(4), "message": "Please enter valid token"}, 500