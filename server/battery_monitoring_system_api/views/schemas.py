import marshmallow as ma


class ErrorSchema(ma.Schema):
    """Error schema"""
    code = ma.fields.Int()
    msg = ma.fields.Str()


def create_response_schema(schema: ma.Schema, name: str):
    return ma.Schema.from_dict({
        'error': ma.fields.Nested(ErrorSchema),
        'result': ma.fields.Nested(schema),
        'response': ma.fields.Nested(schema)
    }, name=name)

def create_error_schema(error_code: int):

    from battery_monitoring_system_api.di import error_map

    return {
        'code': error_code,
        'msg': error_map.get(str(error_code), 'Unknown error')
    }

