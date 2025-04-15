import os
from battery_monitoring_system_api import create_app
from battery_monitoring_system_api.config import DevConfig

ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
app = create_app(DevConfig, os.path.join(ROOT_DIR, 'config.json'))

if __name__ == "__main__":
    app.run()
