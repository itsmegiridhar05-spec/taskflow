from datetime import datetime, timezone
from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = Field(default="healthy", description="Current system operational status")
    app_name: str = Field(description="Name of the application service")
    version: str = Field(description="Current version of the application")
    environment: str = Field(description="Operational deployment environment")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="UTC timestamp of the health check invocation",
    )
