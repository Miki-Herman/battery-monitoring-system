# schemas.py
from marshmallow import Schema, fields, validate


class BatteryDataSchema(Schema):
    system_id: str = fields.Str(required=True, description="Id of monitoring system")
    current: float = fields.Float(required=True, validate=validate.Range(min=0), description="Current in amperes")
    voltage: float = fields.Float(required=True, validate=validate.Range(min=0), description="Voltage in volts")
    temperature: float = fields.Float(required=False, allow_none=True, description="Battery temperature in °C")
    timestamp: int = fields.Integer(required=True, validate=validate.Range(min=0), description="Timestamp when data was received")


class BatteryQuerySchema(Schema):
    systemId: str = fields.Str(required=True, description="Id of monitoring system")
    timestamp: str = fields.Integer(required=False, description="Since when we receive data")



