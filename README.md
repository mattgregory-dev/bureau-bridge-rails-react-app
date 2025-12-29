# support-portal-web

This project is a **single-page web application** (SPA) that behaves like a real SaaS product from a user and support perspective.

Users log in, stay logged in through sessions, and see different parts of the app depending on their role. The frontend and backend are separate applications, which mirrors how many real production systems work and how many real customer issues arise.

This project is designed to demonstrate **application support skills**, not just development.

## Purpose

This project exists to showcase skills that are directly relevant to **Tier 1 / Tier 2 application support**, including:

- Understanding how modern web apps are structured
- Troubleshooting login and logout issues
- Identifying session and authentication problems
- Understanding why users see different data based on role
- Knowing when an issue is frontend-related vs backend-related

It reflects the kinds of problems customers report, such as:
- “I was logged in, then suddenly I wasn’t”
- “I can log in but can’t access what I’m supposed to”
- “It works for one user but not another”

## Architecture Overview (Plain English)

This application is split into two parts:

- A **frontend** that runs in the user’s browser and controls what they see
- A **backend API** that handles logins, permissions, and data

The frontend does not make security decisions on its own. It asks the backend what the user is allowed to do and reacts to the response.

High-level flow:

```text
Browser
  |
  v
React SPA (support-portal-web)
  |
  v  HTTP requests + session cookies
Rails API (support-auth-api)
  |
  v
PostgreSQL database
```

# If something breaks, support needs to know where the failure is happening:

- Browser / UI
- API responses
- Session or authentication state

# Key Behaviors

- Users log in and log out through the API
- Login creates a session stored in a cookie
- The app checks the current session on page load
- Users are redirected if they are not logged in
- Different roles see different UI options
- If a session expires or becomes invalid, the user is treated as logged out

# Roles (User Perspective)

The backend assigns each user a role, which the frontend uses only to decide what to show.

- **Consumer**  
  Regular end user. Limited access.
- **Partner**  
  Business user such as an agent or lender. Broader access than consumers.
- **Admin**  
  Internal user with full access.

Important:

Even if the UI shows something by mistake, the backend still enforces permissions. The server always has the final say.

# Why This Matters for Application Support

This project reflects real situations application support engineers deal with daily:

- “Why does the user appear logged in but actions fail?”
- “Why does logging out and back in fix the issue?”
- “Why can one user see this page but another can’t?”
- “Is this a UI bug, a session issue, or a permissions problem?”

Because the frontend and backend are separate, these questions can be diagnosed clearly instead of guessing.

# Common Support Checks

Examples of things a support engineer would verify:

- Does the `/me` endpoint return a user or an error?
- Is the user’s role what they expect it to be?
- Is the session cookie present?
- Does logging out and logging back in reset the issue?
- Is the API returning a 401/403 error even though the UI looks correct?

# Local Development

```text
npm install
npm run dev
```

The frontend expects the backend API to be running separately and reachable via configuration.

# Related Repository

Backend API:
https://github.com/mattgregory-dev/support-auth-api

Together, these repositories simulate a real-world SaaS system with realistic authentication, session handling, and role-based behavior.

# Status

This project is actively evolving to include more role-based behavior, error scenarios, and edge cases that commonly surface in customer support tickets.
