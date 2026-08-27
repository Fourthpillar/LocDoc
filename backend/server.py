"""Minimal FastAPI service for LocDoc.

The LocDoc website is a purely front-end marketing / product experience — no user
data is persisted here. This tiny FastAPI app exists to satisfy the standard
Emergent deployment topology (a backend service on :8001) and to expose a
health-check endpoint that platform monitors can poll.

If, later, real endpoints are added (bookings, waitlist streams, etc.) they can
plug into this same module.
"""

from __future__ import annotations

import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient


# ---------------------------------------------------------------------------
# Environment (fail-fast: no default values)
# ---------------------------------------------------------------------------
load_dotenv()

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "*").split(",")

# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
app = FastAPI(title="LocDoc API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mongo client is instantiated eagerly so a bad URL fails on boot.
_client = AsyncIOMotorClient(MONGO_URL)
_db = _client[DB_NAME]


@app.get("/api/health")
async def health() -> dict:
    return {
        "status": "ok",
        "service": "locdoc-api",
        "db": DB_NAME,
        "time": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/api/")
async def root() -> dict:
    return {"service": "locdoc-api", "version": app.version}
