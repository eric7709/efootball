export type CompetitionRegistrationStatus = "PENDING" | "APPROVED" | "REJECTED" | "WITHDRAWN";

export interface CompetitionTeam {
  id: string
  competitionId: string
  teamId: string
  registrationStatus: CompetitionRegistrationStatus
}

export interface RegisterCompetitionTeamInput {
  competitionId: string
  teamId: string
}
export interface UpdateCompetitionTeamInput {
  seed?: number
  groupName?: string
  registrationStatus?: CompetitionRegistrationStatus
}
