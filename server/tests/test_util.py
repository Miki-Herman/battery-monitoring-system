from battery_monitoring_system_api.utils import get_version
from importlib.metadata import version


def test_get_version():
    assert get_version() == f"battery-monitoring-system-api@{version('battery_monitoring_system_api')}"