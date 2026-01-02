---
title: "BreachWatch"
date: 2025-01-02
summary: "FastAPI and Postgres service with a React UI for monitoring ransomware leak data, OIDC auth, notifications, and PDF reports."
tags: ["ransomware", "threat-intel", "monitoring", "reports"]
tools: ["fastapi", "postgres", "react", "tailwind", "docker", "oidc"]
status: "active"
---

## Overview
BreachWatch ingests ransomware leak data, organizes it into structured entities, and exposes a UI and API for tracking incidents and subscriptions.

## Highlights
- Ingests victims from ransomware.live v2 into organizations, leaks, evidence, and sources.
- OIDC login (Authentik) with session or bearer token access.
- Background worker runs periodic ingestion and email notifications.
- Report generation pipeline with screenshots and PDF export.

## Local Path
`/opt/breachwatch`
