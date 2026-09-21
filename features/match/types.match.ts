export type MatchStatus = "SCHEDULED" | "ONGOING" | "COMPLETED" | "CANCELLED";
export interface Match {
  id: string;
  competitionId?: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  winnerId?: string;
  stage?: string;
  round?: string;
  status: MatchStatus;
  scheduledAt: string;
  completedAt?: string;
}

export interface CreateMatchInput {
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  stage?: string;
  round?: string;
  scheduledAt: string;
}
export type UpdateMatchInput = Partial<CreateMatchInput> & {
  homeScore?: number;
  awayScore?: number;
  status?: MatchStatus;
  completedAt?: string;
};
