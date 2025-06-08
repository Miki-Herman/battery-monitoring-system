from typing import List
from marshmallow import Schema, fields, validate

class UserQuerySchema(Schema):
    userId: str = fields.Str(required=True, description="User ID")

class UserDataSchema(Schema):
    userId: str = fields.Str(required=True, description="User ID")
    email: str = fields.Str(required=True, description="Email address")
    sensors: List[str] = fields.List(fields.Str, required=True, description="List of sensor ids that user has access to")

class UserUpdateSchema(Schema):
    userId: str = fields.Str(required=True, description="User ID")
    sensors: List[str] = fields.List(fields.Str, required=True, description="List of sensor ids that user has access to")