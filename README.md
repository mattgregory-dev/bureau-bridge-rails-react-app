![BureauBridge](web/public/logo-300x140.png)

# Credit Readiness Platform  
**Monorepo – Rails API + React Frontend**

This repository contains a **concept credit-readiness platform** implemented as a **Rails API backend** with a **React frontend**, structured as a single monorepo.

The project was built to demonstrate **full-stack application design**, **production-oriented boundaries**, and **application support–ready architecture**, including authentication, role-based access, session handling, and API-driven UI workflows.

It is not a live financial product. Credit data handling is simulated to showcase architecture, not to operate as a regulated system.

![BureauBridge](web/public/screenshot.png)

## Overview

The platform models how a modern credit-readiness application could be structured when:

- Sensitive data access is tightly scoped and ephemeral
- Business logic is centralized in the backend
- The frontend remains focused on presentation, state, and workflows
- Multi-tenant and role-based concerns are first-class
- Production stability and supportability are design priorities

The system is intentionally split into:
- A **Rails API** responsible for orchestration, authorization, and data processing
- A **React frontend** responsible for UI, session-aware rendering, and user workflows

## Architecture at a Glance

/api → Ruby on Rails API
/web → React application

**Design intent**:
- Clear separation of concerns
- Explicit data ownership
- Minimal surface area for sensitive operations
- Predictable failure modes and debuggability

## Backend – Rails API

The Rails application acts as the **primary orchestration layer**.

### Responsibilities

- Authentication and session handling
- Role-based access control
- Multi-tenant isolation
- In-session credit data processing
- Calculation of readiness and progress metrics
- Persistence of *derived data only*
- Audit logging for sensitive workflows

### Key Concepts

- **Multi-tenancy**  
  Each tenant represents a credit repair business.

- **Roles**  
  Platform owner, tenant admin, tenant staff, partner, consumer.

- **Goals as the primary unit of work**  
  Goals serve as the container for collaboration and progress tracking.

- **Session-based credit access**  
  Raw credit data is accessed and processed only during authorized sessions.

- **Derived data persistence**  
  Only calculated metrics and summaries are stored. Raw bureau data is not persisted.

### Data Handling Philosophy

- Raw credit data is treated as **ephemeral**
- Payloads are processed in memory
- No storage of tradelines, PDFs, or bureau raw data
- Only derived readiness and progress metrics are persisted
- External integrations are assumed for any report or document access

This approach intentionally limits blast radius and simplifies compliance considerations.

## Frontend – React Application

The React application provides the **user-facing experience** and consumes JSON APIs exposed by the Rails backend.

### Responsibilities

- Render a clean, professional UI
- Manage client-side state and sessions
- Display credit snapshots and readiness metrics
- Enforce role-based visibility at the UI layer
- Support goal-centric workflows and collaboration
- Present derived metrics clearly without exposing raw data

### Design Principles

- **Session-driven UI**  
  Data is rendered only within authorized sessions.

- **Role-aware rendering**  
  Consumers, tenant staff, and partners see different levels of detail.

- **Metrics-first presentation**  
  Emphasis on clarity of calculated insights rather than raw reports.

- **API-driven architecture**  
  No business logic related to credit processing lives in the frontend.

## Repo Layout

- `api/` Rails API (auth, business logic, background jobs, mailers)
- `web/` React frontend (UI, client-side routing, API client)

## Getting Started

### Backend (Rails)

```bash
cd api
bundle install
bin/rails db:prepare
bundle exec rails s
```

### Frontend (React)

```bash
cd web
npm install
npm run dev
```

## What This Project Demonstrates

This project is demonstrate:

- Full-stack system design with clear boundaries
- Production-oriented thinking around data handling and risk
- Role-based access and multi-tenant concerns
- API-driven frontend architecture
- Judgment around what *not* to build or store
- Readiness for application support, debugging, and incident response

## Status

Active, early-stage build.

Core architecture, models, and workflows are in place.  
APIs, authorization, and UI structure continue to evolve as the system is refined.

## Notes for Reviewers

- This is a **concept platform**, not a production financial system
- Credit data handling is simulated to showcase architecture
- Emphasis is placed on boundaries, safety, and supportability
- Tradeoffs are intentional and documented
