"""ProtectedView"""
from flask_jwt_extended import jwt_required


class ProtectedView:
    """Mixin that protects MethodViews by requiring a JWT token for all their methods

    JWT token is only required when in PRODUCTION mode
    """

    def __init__(self, *args, **kwargs):
        view_methods = ["get", "post", "put", "delete", "patch", "options", "head"]

        for method in view_methods:
            if hasattr(self, method):
                original_method = getattr(self, method)
                decorated_method = jwt_required()(original_method)
                setattr(self, method, decorated_method)
