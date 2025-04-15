import sys
from flask.views import MethodView
from flask_smorest import Blueprint
from flask import current_app
from notification_api.views.info.schemas import InfoSchema
from notification_api.views.schemas import create_response_schema

blp = Blueprint('info', 'info')


@blp.route('/')
class InfoResource(MethodView):

    @blp.doc(security=[])
    @blp.response(200, create_response_schema(InfoSchema, 'InfoResponse'))
    def get(self):
        metadata = [{"key": "python_version", "value": sys.version}]

        response = {
            "error": {"code": 0, "msg": "OK"},
            "response": {
                "version": current_app.config.get('VERSION'),
                "timestamp": current_app.config.get('TIMESTAMP'),
                "metadata": metadata,
            },
        }

        return response, 200
