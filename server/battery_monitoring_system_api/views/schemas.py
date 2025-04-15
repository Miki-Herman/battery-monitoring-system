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
