"""Backend smoke tests for LocDoc FastAPI service."""
import os
import requests

BASE_URL = "http://localhost:8001"


def test_health_endpoint():
    r = requests.get(f"{BASE_URL}/api/health", timeout=10)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"
    assert data["service"] == "locdoc-api"
    assert "db" in data
    assert "time" in data


def test_api_root():
    r = requests.get(f"{BASE_URL}/api/", timeout=10)
    assert r.status_code == 200
    data = r.json()
    assert data["service"] == "locdoc-api"
    assert "version" in data


def test_cors_headers():
    r = requests.options(
        f"{BASE_URL}/api/health",
        headers={
            "Origin": "http://example.com",
            "Access-Control-Request-Method": "GET",
        },
        timeout=10,
    )
    # FastAPI CORS middleware returns 200 for preflight
    assert r.status_code in (200, 204)
    assert "access-control-allow-origin" in {k.lower() for k in r.headers.keys()}
