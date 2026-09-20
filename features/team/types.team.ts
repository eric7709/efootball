export interface Team {
  id: string
  name: string
  tag: string
  logo?: string
  strength: number
  country: string
  region?: string
  description?: string
  createdAt: string
  updatedAt: string
}
export interface CreateTeamInput {
  name: string
  tag: string
  country: string
  region?: string
  description?: string
  captainId: string
  managerId?: string
}
export type UpdateTeamInput = Partial<CreateTeamInput> & {
  strength?: number
  competitiveRating?: number
};
