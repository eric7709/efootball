export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    currentUser: ["auth", "current-user"] as const,
  },
  players: {
    all: ["players"] as const,
    detail: (id: string) => ["players", id] as const,
  },
  teams: {
    all: ["teams"] as const,
    detail: (id: string) => ["teams", id] as const,
    members: (id: string) => ["teams", id, "members"] as const,
    statistics: (id: string) => ["teams", id, "statistics"] as const,
  },
  competitions: {
    all: ["competitions"] as const,
    detail: (id: string) => ["competitions", id] as const,
    teams: (id: string) => ["competitions", id, "teams"] as const,
    matches: (id: string) => ["competitions", id, "matches"] as const,
    standings: (id: string) => ["competitions", id, "standings"] as const,
  },
  teamMembers: {
    all: ["team-members"] as const,
    detail: (id: string) => ["team-members", id] as const,
    byTeam: (teamId: string) => ["team-members", "team", teamId] as const,
    byPlayer: (playerId: string) =>
      ["team-members", "player", playerId] as const,
  },
  competitionTeams: {
    all: ["competition-teams"] as const,
    detail: (id: string) => ["competition-teams", id] as const,
    byCompetition: (competitionId: string) =>
      ["competition-teams", "competition", competitionId] as const,
    byTeam: (teamId: string) => ["competition-teams", "team", teamId] as const,
  },
  matches: {
    all: ["matches"] as const,
    detail: (id: string) => ["matches", id] as const,
    evidence: (matchId: string) => ["matches", matchId, "evidence"] as const,
  },
  evidence: {
    all: ["match-evidence"] as const,
    detail: (id: string) => ["match-evidence", id] as const,
    byMatch: (matchId: string) => ["match-evidence", matchId] as const,
  },
  playerStatistics: {
    all: ["player-statistics"] as const,
    detail: (playerId: string) => ["player-statistics", playerId] as const,
  },
  competitionTeamStatistics: {
    all: ["competition-team-statistics"] as const,
    detail: (id: string) => ["competition-team-statistics", id] as const,
    byCompetition: (competitionId: string) =>
      ["competition-team-statistics", "competition", competitionId] as const,
    byTeam: (teamId: string) =>
      ["competition-team-statistics", "team", teamId] as const,
  },
  rankings: {
    all: ["rankings"] as const,
    detail: (id: string) => ["rankings", id] as const,
  },
  reports: {
    all: ["reports"] as const,
    detail: (id: string) => ["reports", id] as const,
  },
  notifications: {
    all: ["notifications"] as const,
    detail: (id: string) => ["notifications", id] as const,
    unread: ["notifications", "unread"] as const,
  },
  achievements: {
    all: ["achievements"] as const,
    detail: (id: string) => ["achievements", id] as const,
  },
};
