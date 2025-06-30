# schemas.py
from marshmallow import Schema, fields


class AuthDataSchema(Schema):
    googleId = fields.Str(required=True)

class AuthGatewaySchema(Schema):
    token = fields.Str(required=True)