# eFootball Feature Architecture

The application is organized by **domain entity first**. Each entity owns its types, state, dummy data, React Query API hooks, utilities, and reusable shared components. Role-specific use cases live inside that entity.

```text
features/
├── competition/
│   ├── roles/
│   │   ├── admin/
│   │   │   └── manageCompetition/
│   │   │       ├── createCompetition/
│   │   │       ├── updateCompetition/
│   │   │       ├── deleteCompetition/
│   │   │       └── viewCompetition/
│   │   ├── moderator/
│   │   └── user/
│   ├── types.competition.ts
│   ├── store.competition.ts
│   ├── utils/
│   ├── hooks/
│   │   ├── api.competition.ts
│   │   ├── useGetAllCompetitions.ts
│   │   ├── useGetCompetition.ts
│   │   ├── useCreateCompetition.ts
│   │   ├── useUpdateCompetition.ts
│   │   └── useDeleteCompetition.ts
│   ├── dummydata/
│   └── shared/
│
├── player/
├── team/
├── competitionTeam/
├── teamMember/
├── match/
├── matchEvidence/
├── playerStatistics/
├── competitionTeamStatistics/
├── ranking/
├── report/
├── notification/
└── achievement/
```

## SRP rule

A role folder contains the UI/use-case for that role. Entity types and server-state hooks are not duplicated inside `admin`, `moderator`, or `user`.

## React Query rule

All simulated API operations are implemented by `hooks/api.<entity>.ts` and exposed through small, single-purpose hooks. The API layer can later be replaced by real HTTP calls without forcing the role UI to change.
