export type TeamMemberRole = "CAPTAIN" | "MANAGER" | "PLAYER" | "COACH";
export type MembershipStatus = "ACTIVE" | "INACTIVE" | "BANNED";
export interface TeamMember {
  id: string
  teamId: string
  playerId: string
  role: TeamMemberRole
  joinedAt: string
  status: MembershipStatus
}
export interface AddTeamMemberInput {
  teamId: string
  playerId: string
  role: TeamMemberRole
}
export interface UpdateTeamMemberInput {
  role?: TeamMemberRole
  status?: MembershipStatus
}
