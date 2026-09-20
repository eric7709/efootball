export type CompetitionStatus = "DRAFT" | "REGISTRATION_OPEN" | "REGISTRATION_CLOSED" | "ONGOING" | "COMPLETED" | "CANCELLED";

export type CompetitionType = "LEAGUE" | "KNOCKOUT" | "GROUP_STAGE" | "GROUP_KNOCKOUT" | "SWISS" | "CUSTOM";

export interface Competition {
  id: string
  name: string
  description?: string
  year: number
  season?: string
  type: CompetitionType
  numberOfTeams: number
  platform: "MOBILE" | "PLAYSTATION" | "XBOX" | "PC"
  gameMode: string
  location?: string
  registrationStart: string
  registrationEnd: string
  startDate: string
  endDate: string
  prizePool?: number
  status: CompetitionStatus
  logo?: string
  banner?: string
  createdAt: string
  updatedAt: string
}

export interface CreateCompetitionInput extends Omit<Competition, "id" | "status" | "createdAt" | "updatedAt"> {}

export type UpdateCompetitionInput = Partial<CreateCompetitionInput> & {
  status?: CompetitionStatus
};
