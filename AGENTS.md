# AGENTS.md

This repo is a monorepo that contains a Rails API and a React frontend. This file defines how an AI coding agent should work in this codebase.

## Goals
- Make small, reviewable changes.
- Prefer correctness and tests over speed.
- Keep Rails and React changes consistent with existing patterns.

## Repo layout
- `/api/` Rails API (auth, business logic, background jobs, mailers)
- `/web/` React frontend (UI, client-side routing, API client)
- `/docs/` Project docs (if present)

If the actual layout differs, follow the existing folder structure you find and update this file.

## Ground rules
- Do not invent endpoints, models, env vars, or schemas without explicit instruction.
  If a required endpoint, model, env var, or schema does not already exist and the task
  requires one, propose it first and wait for confirmation before implementing.
- Do not commit secrets. Never add API keys, passwords, tokens, or private URLs.
- Do not change formatting or refactor unrelated code unless explicitly asked.
- Prefer minimal diffs. Avoid broad file reformatting.
- Maintain backward compatibility unless the task explicitly allows breaking changes.

## How to work (required workflow)
1. Propose a short plan and list the files to be changed.
2. Apply changes as a patch/diff suitable for review.
3. Make only the agreed-upon edits.
4. Run the preferred verification commands (see “Verification commands (preferred)”).
5. Fix failures.
6. Summarize what changed, which files changed, and how it was verified.

The default workflow is:
agent edits → git diff → run tests → human review → human commit

## Version control rules
- Do not create commits.
- Do not amend commits.
- Do not push branches.
- All changes must remain uncommitted for human review.

## Environment setup
- Rails uses environment variables (see `/api/.env.example` if present).
- React uses environment variables (see `/web/.env.example` if present).

If examples are missing, do not guess env var names. Ask.

## Common commands

### Rails (from `/api`)
- Install dependencies:
  - `bundle install`
- Setup database:
  - `bin/rails db:prepare`
- Run server:
  - `bin/rails s`
- Run tests:
  - `bundle exec rspec`
- Run a single spec:
  - `bundle exec rspec spec/path/to/spec.rb:LINE`
- Lint (if configured):
  - `bundle exec rubocop`

### React (from `/web`)
- Install dependencies:
  - `npm install` (or `pnpm install` / `yarn install`, match what the repo uses)
- Run dev server:
  - `npm run dev` (or `npm start`, match the repo)
- Run tests:
  - `npm test` (or `npm run test`)
- Lint:
  - `npm run lint`
- Build:
  - `npm run build`

If the repo uses different scripts, read `/web/package.json` and use the existing ones.

## Architecture conventions

### Rails
- Prefer existing patterns already used in `/api`.
- Service objects: if the repo already uses them, put them in the existing location (commonly `app/services/`).
- Avoid putting complex business logic in controllers.
- Use strong params and keep controllers thin.
- Add or update request specs when changing endpoints.
- Migrations:
  - Keep migrations small and reversible.
  - Do not rewrite old migrations on shared branches.

### React
- Prefer existing patterns already used in `/web`.
- Keep API calls in the existing API client layer (do not scatter fetch calls across components if the repo has a client wrapper).
- Maintain consistent state management approach (Redux, Zustand, React Query, Context, etc).
- Add or update tests where the repo already tests UI logic.

## API contracts
- When you change a Rails request or response payload, update the React side in the same PR.
- Keep naming consistent (snake_case vs camelCase) based on existing conventions.
- If the repo uses serializers (ActiveModelSerializers, Blueprinter, Jbuilder, etc), follow the existing serializer pattern.

## “Do not touch” areas (unless asked)
- Authentication and authorization flows, unless the task is explicitly about auth.
- Payment/billing integrations, unless the task is explicitly about billing.
- Production config, infra, and deployment scripts, unless requested.
- Database schema design, unless the task requires it.

## Logging and debugging
- Prefer structured logs if already present.
- When diagnosing issues, reference:
  - Rails logs in `/api/log/`
  - Browser console and network tab for frontend
- Do not add noisy logs permanently. Remove debug prints before finishing.

## Verification checklist (must include in your final summary)
- [ ] Commands run (exact commands)
- [ ] Tests run (exact tests, or “not run” with reason)
- [ ] Files changed (list)
- [ ] Any env vars added or modified (names only, no values)

## Verification commands (preferred)
Use a single verification command per side whenever possible.

- Rails (preferred):
  - `bundle exec rspec`
- React (preferred):
  - `npm test` (or the primary test command defined in `package.json`)

When instructed to verify changes:
- Run the preferred command.
- Fix only failures caused by the current change.
- Do not introduce unrelated refactors to satisfy tests.

## Communication format for agent responses
When you respond to a task, use this structure:
1. Plan (short)
2. Files to change
3. Patch summary (what changed)
4. Verification (commands run and results)
5. Notes or risks
