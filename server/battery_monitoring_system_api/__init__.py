from flask_jwt_extended import JWTManager
import json
import time
from flask import Flask, jsonify
from webargs import ValidationError
from .config import ProdConfig
from .extensions import api, cors, mongo



def create_app(config_object=ProdConfig, config_file='', timestamp=None, sentry_environment=None):
    if timestamp is None:
        timestamp = round(time.time())

    app = Flask(__name__)
    app.config.from_object(config_object)
    app.config.from_file(config_file, load=json.load, silent=True)
    app.config['TIMESTAMP'] = timestamp


    _jwt = JWTManager(app)

    @_jwt.expired_token_loader
    def my_expired_token_callback(jwt_header, jwt_payload):
        return jsonify({"error": {"msg": "Token has expired", "code": 401}}), 401

    register_extensions(app)
    mongo.init_app(app)
    from .views import register_resources
    register_resources(api)
    register_error_handlers(app)

    return app

def register_extensions(app):
    cors.init_app(app)
    api.init_app(app)

def register_error_handlers(app):
    def handle_validation_error(err: ValidationError):
        headers = err.data.get("headers", None)
        messages = err.data.get("messages", ["Invalid request."])

        if headers:
            return (
                jsonify(
                    {
                        "error": {
                            "msg": "Validation error",
                            "code": err.code,
                            "data": messages,
                        }
                    }
                ),
                err.code,
                headers,
            )

        return (
            jsonify(
                {
                    "error": {
                        "msg": "Validation error",
                        "code": err.code,
                        "data": messages,
                    }
                }
            ),
            err.code,
        )

    def handle_exception(err):
        """global exception handler"""
        return jsonify({"error": {"msg": "Internal server error", "code": 500}}), 500

    app.register_error_handler(400, handle_validation_error)
    app.register_error_handler(422, handle_validation_error)

    if app.config.get('PRODUCTION'):
        app.register_error_handler(Exception, handle_exception)
