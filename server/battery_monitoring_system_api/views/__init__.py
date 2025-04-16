from flask_smorest import Api
from battery_monitoring_system_api.views import info, data

RESOURCES = [
    info, data
]


def register_resources(api: Api):
    for r in RESOURCES:
        api.register_blueprint(r.blp)
