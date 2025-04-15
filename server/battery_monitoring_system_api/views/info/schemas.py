import marshmallow as ma


class MetadataItemSchema(ma.Schema):
    key = ma.fields.Str(required=True)
    value = ma.fields.Str(required=True)


class InfoSchema(ma.Schema):
    version = ma.fields.Str(required=True)
    timestamp = ma.fields.Int(required=True)
    metadata = ma.fields.Nested(MetadataItemSchema(many=True))
