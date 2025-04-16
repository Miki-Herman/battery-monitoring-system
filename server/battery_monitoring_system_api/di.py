from flask import current_app

config = current_app.config

connection_string = config.get("DATABASE_CONN_STR", "")
