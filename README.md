# support-portal-web

A production-style **React single-page application** that serves as the frontend for a role-based support platform.  
This app consumes a separate Rails API and demonstrates real-world authentication, session handling, and access control patterns commonly encountered in SaaS environments.

## Purpose

This project exists to showcase **application support–relevant skills**, including:

- Working with a decoupled frontend/backend architecture
- Debugging authentication and session issues across services
- Handling role-based access at the UI layer
- Understanding how SPAs interact with API-only backends in production

It is intentionally **not** server-rendered and does not share code with the backend, mirroring how modern SaaS systems are deployed.

## Architecture Overview

- **Frontend:** React + Vite  
- **Backend:** Rails API (`support-auth-api`, separate repository)
- **Auth model:** Cookie-based sessions over HTTP
- **Deployment model:** SPA served independently (e.g., behind Nginx or CDN)

```text
Browser
  |
  v
React SPA (support-portal-web)
  |
  v  HTTP + cookies
Rails API (support-auth-api)
  |
  v
PostgreSQL
```

## Key Features

- Login and logout flows via API
- Session persistence using HTTP cookies
- `/me` endpoint check on application load
- Protected routes using React Router
- Role-aware UI rendering (consumer / partner / admin)
- Graceful handling of unauthorized or expired sessions

The frontend **never assumes trust**—all permissions are enforced by the API and reflected in the UI.

## Roles (UI perspective)

The application supports multiple user roles returned by the API:

- **Consumer** – end user viewing their own data
- **Partner** – limited-access professional (e.g., agent or lender)
- **Admin** – full-access internal user

The React app uses role information only for **conditional rendering** and routing; authorization is enforced server-side.

## Why this matters for application support

This codebase is designed to reflect situations application support engineers routinely face:

- “Why is a user being logged out unexpectedly?”
- “Why does this role see partial data?”
- “Why does the UI think the user is logged in but the API disagrees?”
- “Is this a frontend bug or a backend auth issue?”

The project intentionally separates concerns so these questions can be diagnosed clearly.

## Local Development

```text
npm install
npm run dev
```

The app expects the API to be running separately and accessible via environment configuration.

# Related Repository

Backend API:
https://github.com/mattgregory-dev/support-auth-api

Together, these two repositories form a complete, production-style system.

# Status

This project is actively evolving as additional authorization rules, role-specific flows, and failure scenarios are added.