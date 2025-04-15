import os
from .utils import get_version

version = get_version()

class Config(object):
    PRODUCTION = False

    APP_DIR = os.path.abspath(os.path.dirname(__file__))  # This directory
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))

    PROPAGATE_EXCEPTIONS = True
    BASE_PATH = '/'

    VERSION = version

    API_TITLE = 'Battery Monitoring System API'
    API_VERSION = version

    OPENAPI_VERSION = '3.0.2'
    OPENAPI_URL_PREFIX = '/'


class DevConfig(Config):
    PRODUCTION = False
    SENTRY_DSN = None


class ProdConfig(Config):
    PRODUCTION = True
    SENTRY_ENVIRONMENT = 'production'


class TestConfig(Config):
    PRODUCTION = False
    SENTRY_DSN = None