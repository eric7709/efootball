# eFootball Platform — Feature-First Next.js Architecture

The application is organized by entity feature. Each entity contains its types,
dummy data, React Query hooks/API layer, utilities, shared components, and role-specific
use cases.

```text
features/
├── competition/
│   ├── roles/
│   │   ├── admin/
│   │   │   └── manageCompetition/
│   │   │       ├── viewCompetition/
│   │   │       ├── createCompetition/
│   │   │       ├── updateCompetition/
│   │   │       ├── deleteCompetition/
│   │   │       └── shared/
│   │   ├── moderator/
│   │   └── user/
│   ├── types.competition.ts
│   ├── store.competition.ts
│   ├── hooks/
│   ├── utils/
│   ├── dummydata/
│   └── shared/
├── player/
├── team/
├── match/
├── matchEvidence/
├── competitionTeam/
├── teamMember/
├── playerStatistics/
├── teamStatistics/
├── ranking/
├── report/
├── notification/
└── achievement/
```

## Admin routing rule

Admin CRUD is **not** represented by separate routes.

Routes represent list/table screens:

```text
/admin
/admin/players
/admin/teams
/admin/competitions
/admin/matches
/admin/reports
/admin/rankings
/admin/notifications
```

Create, update and delete are modal workflows inside their corresponding table page:

```text
Table
 ├── Create → Create Modal → Form → React Query mutation
 ├── Edit   → Update Modal → Form → React Query mutation
 └── Delete → Confirm Modal → React Query mutation
```

This keeps URLs clean and avoids creating unnecessary pages for CRUD operations.

## React Query

Entity hooks remain the server-state boundary. They simulate API calls with an
in-memory repository and artificial latency, including list/get/create/update/delete
where appropriate. Replace the repository implementation with real HTTP calls when
the backend is ready.

## SRP

Small components have one responsibility: table, row actions, modal, field groups,
buttons, validation, and API operations are separated. Role folders compose those
pieces into use cases instead of owning duplicate entity types or API hooks.
