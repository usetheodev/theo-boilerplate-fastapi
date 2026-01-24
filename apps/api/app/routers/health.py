"""Health check endpoints."""

from datetime import datetime
from typing import Any

from fastapi import APIRouter

from app.config import settings

router = APIRouter()


@router.get("/health")
async def health_check() -> dict[str, Any]:
    """
    Health check endpoint for Kubernetes probes.

    Returns basic application health status.
    Used by:
    - startupProbe
    - livenessProbe
    - readinessProbe
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": settings.app_name,
        "version": "0.1.0",
        "environment": settings.environment,
        "release_id": settings.theo_release_id or None,
        "build_id": settings.theo_build_id or None,
    }


@router.get("/health/ready")
async def readiness_check() -> dict[str, Any]:
    """
    Readiness check endpoint.

    Verifies the application is ready to receive traffic.
    Can include database connectivity checks in production.
    """
    return {
        "status": "ready",
        "timestamp": datetime.utcnow().isoformat(),
    }


@router.get("/health/live")
async def liveness_check() -> dict[str, str]:
    """
    Liveness check endpoint.

    Simple check that the application is running.
    """
    return {"status": "alive"}
