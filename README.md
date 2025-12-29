# support-auth-api

This project represents the backend side of a SaaS application where most login, access, and “why am I blocked?” issues actually originate.

From a support perspective, this is the system that answers questions like:
- Is this user actually logged in?
- Does their account allow them to do this?
- Is the system rejecting them, even if the UI looks fine?

If a user insists “the app is broken,” this is usually where the answer lives.

## What This API Is Responsible For

This API sits behind the scenes and makes decisions the frontend cannot.

It:
- Keeps track of whether a user is logged in
- Knows which account the user belongs to
- Enforces access based on role
- Rejects requests when something is off

The frontend only reacts to these decisions.  
It does not get a vote.

## The Kinds of Issues This Explains

Most customer-facing issues that feel “random” or “inconsistent” trace back here, for example:

- A user can log in but suddenly can’t do something they did earlier
- A user gets logged out without clicking logout
- Two users swear they have the same access, but only one works
- The UI looks normal, but every action fails
- Logging out and back in magically fixes things

These aren’t UI mysteries — they’re usually session or permission decisions made by this API.

## Login State and Sessions

This API uses sessions to track login state.

What matters from a support standpoint:
- Logging in creates a session
- That session must be present on every request
- If the session disappears, expires, or becomes invalid, the user is treated as logged out

This explains common complaints like:
- “It worked earlier today”
- “I didn’t log out”
- “Refreshing didn’t help, but logging out did”

Those are classic session-related symptoms.

## Roles and Access Decisions

Each user account has a role assigned by the system.

Roles include:
- Consumer
- Partner
- Admin

Roles are not cosmetic.  
They directly control what the API allows.

Important for support:
- The UI cannot override roles
- Seeing a button does not mean the action will succeed
- If access is denied, the role on the account must be verified

When a user says “I should be able to do this,” the role is one of the first things to check.

## Common Responses and How to Read Them

Support often runs into these outcomes:

- **200 OK**  
  The request succeeded. The user is logged in and allowed.

- **401 Unauthorized**  
  The system does not recognize the user as logged in.  
  Usually tied to session problems.

- **403 Forbidden**  
  The user is logged in, but their account is not allowed to do this.  
  This is almost always a role or permissions issue.

Understanding the difference prevents chasing the wrong problem.

## Things a Support Analyst Would Check Here

When troubleshooting an issue tied to this API, common checks include:

- Does the system recognize the user as logged in?
- Is there an active session?
- Does `/me` return a user or an error?
- Is the user assigned the role they expect?
- Is the API rejecting the request even though the UI looks correct?

These checks help determine whether the issue is:
- Account-related
- Session-related
- Or something the frontend is simply reacting to

## How This Relates to the Frontend

Users never talk to this API directly.  
They interact with the frontend, which passes requests along.

If the frontend and API disagree:
- The API is the source of truth
- The frontend is only reporting what it’s told

Many “UI bugs” turn out to be accurate reflections of API decisions.

## Why This Exists

This project is intentionally focused on the kinds of failures that generate support tickets:

- Login confusion
- Session inconsistencies
- Access complaints
- “It works for them but not me”

The goal is not to show backend complexity, but to demonstrate how these issues can be understood, explained, and escalated with clarity.