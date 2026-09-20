# Route Map

This project has **123 UI route pages** plus a mock API route.

## UI routes

Routes follow the feature function names while keeping the public URL concise:

- `/admin/<entity>/<function>`
- `/moderator/<entity>/<function>`
- `/user/<entity>/<function>`

Examples:

- `/admin/competition` — view/manage competitions
- `/admin/competition/create` — create competition
- `/admin/competition/update/[competitionId]` — update competition
- `/admin/competition/delete/[competitionId]` — delete competition
- `/admin/competition/teams` — manage competition teams
- `/admin/competition/matches` — manage competition matches
- `/moderator/match/review` — review matches
- `/moderator/match-evidence/approve/[matchEvidenceId]` — approve evidence
- `/user/competition/register` — register a team
- `/user/match/submit` — submit a match result

Detail routes use the entity ID as a dynamic segment.

## API routes

A catch-all mock adapter is available at:

`/api/[entity]/[[...action]]`

Examples of API shapes:

- `GET /api/competition`
- `GET /api/competition/competition-001`
- `POST /api/competition`
- `PATCH /api/competition/competition-001`
- `DELETE /api/competition/competition-001`
- `GET /api/competition/competition-001/teams`
- `GET /api/match/match-001/evidence`

The React Query hooks remain the application-facing API layer. Replace the repository implementation with real HTTP calls when the NestJS backend is connected.
