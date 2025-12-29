# support-portal-web

This project is a simple web application that behaves like a real SaaS product from a customer support point of view.

Users log in, stay logged in using sessions, and see different things depending on who they are. The goal of this project is not to show programming skills, but to show how common user issues can be understood, identified, and explained.

This mirrors the kinds of problems customers complain about every day.

## Purpose

This project exists to demonstrate skills relevant to Tier 1, customer-facing application support roles.

Specifically:

- Understanding why users can or cannot log in
- Understanding why a user might suddenly be logged out
- Understanding why different users see different things
- Being able to tell whether an issue is:
  - a screen/UI problem
  - a login/session problem
  - or a permissions issue

These are the kinds of problems users report, for example:

- “I was logged in and then it kicked me out”
- “I can log in but I can’t see what I’m supposed to”
- “It works for my coworker but not for me”

## How the app works

This application is split into two parts:

- 1) The part the user sees in their browser (the frontend)
- 2) The part that handles logins and permissions (the backend)

The screen does NOT decide what a user is allowed to do. It asks the backend, and then shows or hides things based on the answer.

If something breaks, support needs to figure out where the problem is happening:

- The browser or screen
- The response coming back from the server
- The user’s login or session state

# What the app does

- Users log in and log out
- Logging in creates a session so the user stays logged in
- The app checks the session when the page loads
- Users are sent to the login screen if they are not logged in
- Different users see different options
- If a session expires or breaks, the user is treated as logged out

# User types (from a support perspective)

Each user has a type assigned by the system.

- **Consumer**  
  Regular end user.
- **Partner**  
  Business user (agent, lender, etc.)
- **Admin**  
  Internal user with full access.

Important:

Even if the screen looks wrong, the system behind the scenes still controls access.
The server always has the final say.

# Why this matters for customer support

This project reflects real situations support analysts deal with:

- A user looks logged in but actions fail
- Logging out and back in suddenly fixes the problem
- One user can see something but another can’t
- It’s unclear whether the problem is the screen or the account

Because the parts of the system are separate, these situations can be reasoned about instead of guessed at.

# Common things a support analyst would check

Examples of things a support engineer would verify:

- Does the system recognize the user as logged in?
- Is the user assigned the correct type?
- Does logging out and logging back in reset the issue?
- Is the system rejecting the request even though the screen looks normal?

# Local setup

The app runs locally and talks to a separate backend service.
This exists only to simulate a real production environment.

# Related backend project

Backend API:
https://github.com/mattgregory-dev/support-auth-api

Together, these projects simulate a real-world SaaS system with realistic login behavior, session issues, and permission problems that commonly show up in customer support tickets.

# Status

This project continues to evolve to include more realistic user issues, edge cases, and failure scenarios that support analysts commonly encounter.
