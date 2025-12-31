![BureauBridge](public/logo-300x140.png)

# Credit Readiness Platform – React Frontend

This repository contains the React frontend for the Credit Readiness Platform.

The frontend is responsible for rendering the user interface, managing client-side state, and interacting with the Rails API. It does not contain business logic related to credit processing or data persistence.

## Purpose

The frontend is designed to:

- Provide a clean, professional UI for tenants, consumers, and partners
- Authenticate users and maintain session state
- Display credit snapshots, readiness assessments, and progress metrics
- Enforce role-based visibility at the UI layer
- Support goal-based workflows and collaboration
- Visualize calculated metrics in an understandable way

## Scope and Boundaries

The React application:

- **Does**:
  - Consume JSON APIs exposed by the Rails backend
  - Render session-based credit snapshots
  - Display derived readiness and progress metrics
  - Support multiple roles and tenant contexts
  - Share summary views with partners when authorized

- **Does Not**:
  - Process or normalize raw credit data
  - Persist credit report data
  - Handle payment processing or billing
  - Implement business rules related to credit readiness
  - Integrate directly with credit data warehouses

All sensitive processing and persistence decisions live in the backend.

## Key Concepts

- **Session-driven UI**  
  Credit data is presented during authorized sessions and treated as transient.

- **Goal-centric views**  
  The UI centers around goals as the primary unit of work.

- **Role-aware rendering**  
  Consumers, tenant staff, and partners see different levels of detail.

- **Metrics-first presentation**  
  Focus on clarity of calculated metrics rather than raw report data.

## Tech Stack

- React
- Modern component-based architecture
- API-driven data flow
- Styling and visualization tooling (evolving)

## Status

This frontend is under active development.

Initial layouts and data flows are being established.  
UI structure and component hierarchy are expected to evolve as backend APIs mature.

## Related Repositories

- Rails backend repository (API, data processing, authorization)
