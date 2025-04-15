import pytest
import os
from battery_monitoring_system_api import create_app
from battery_monitoring_system_api.config import TestConfig


@pytest.fixture()
def app():
    app = create_app(TestConfig, config_file=os.path.join(TestConfig.PROJECT_ROOT, 'config.testing.json'))
    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
