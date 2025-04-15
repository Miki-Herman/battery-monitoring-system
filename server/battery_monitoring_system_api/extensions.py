from flask_smorest import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

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
jwt = JWTManager()
cors = CORS()