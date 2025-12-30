# Credit Readiness Platform – Rails API

This repository contains the Ruby on Rails backend for the Credit Readiness Platform.

The Rails application acts as the primary API and orchestration layer. It is responsible for authentication, session handling, role-based access control, credit data processing, and persistence of derived metrics.

## Purpose

The backend is designed to:

- Integrate with a third-party credit data warehouse
- Process and normalize credit report payloads in-session
- Compute credit readiness and progress metrics
- Persist *derived data only* (no raw credit report storage)
- Enforce tenant, role, and permission boundaries
- Support multi-tenant operation for credit repair businesses

## Key Concepts

- **Multi-tenant architecture**  
  Each tenant represents a credit repair business.

- **Roles**  
  Platform owner, tenant admin, tenant staff, partner, consumer.

- **Goals**  
  Goals act as the primary collaboration and tracking container for a consumer’s credit journey.

- **Session-based credit access**  
  Raw credit data is accessed and processed during authorized sessions only.

- **Derived data persistence**  
  Only calculated metrics, assessments, and aggregates are stored.

- **Auditability**  
  Access to sensitive workflows is logged for traceability.

## Tech Stack

- Ruby on Rails
- JSON-based API consumed by a React frontend
- Session-based authentication (implementation evolving)
- Relational database for users, tenants, goals, and metrics

## Data Handling Philosophy

- Raw credit report data is treated as **ephemeral**
- Credit payloads are processed in memory
- No storage of tradelines, PDFs, or bureau raw data
- Only calculated readiness and progress metrics are persisted
- PDF and report access is performed via authorized integrations, not local storage

## Status

This is an active, early-stage build.

Core architecture and foundational models are in place.  
Authorization, APIs, and workflows are under active development.

## Related Repositories

- React frontend repository (UI and client-side logic)
