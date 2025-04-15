from importlib.metadata import version

def get_version():
    return f"battery-monitoring-system-api@{version('battery_monitoring_system_api')}"


def normalize_response(data, error=None) -> dict:
    if error is None:
        error = {'code': 200, 'message': 'OK'}

    return {
        'error': error,
        'result': data
    }