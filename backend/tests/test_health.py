from fastapi.testclient import TestClient
from app.core.config import settings


def test_root_health_endpoint(client: TestClient):
    """Test that GET /health returns 200 OK and expected JSON schema."""
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "healthy"
    assert data["app_name"] == settings.PROJECT_NAME
    assert data["version"] == settings.VERSION
    assert data["environment"] == settings.ENVIRONMENT
    assert "timestamp" in data


def test_v1_health_endpoint(client: TestClient):
    """Test that GET /api/v1/health returns 200 OK with identical payload."""
    response = client.get(f"{settings.API_V1_STR}/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "healthy"
    assert data["app_name"] == settings.PROJECT_NAME


def test_root_endpoint(client: TestClient):
    """Test that GET / returns service overview and documentation links."""
    response = client.get("/")
    assert response.status_code == 200

    data = response.json()
    assert data["service"] == settings.PROJECT_NAME
    assert data["docs_url"] == "/docs"
    assert data["health_check"] == "/health"
