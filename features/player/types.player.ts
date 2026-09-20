export type PlatformType = "MOBILE" | "PLAYSTATION" | "XBOX" | "PC";
export type PlayerStatus = "ACTIVE" | "SUSPENDED" | "BANNED";

export interface Player {
  id: string
  gamerTag: string
  displayName?: string
  country: string
  state?: string
  platform: PlatformType
  playerId?: string
  bio?: string
  profileImage?: string
  status: PlayerStatus
  createdAt: string
  updatedAt: string
}

export interface CreatePlayerInput {
  gamerTag: string
  displayName?: string
  country: string
  state?: string
  platform: PlatformType
  playerId?: string
  bio?: string
}

export type UpdatePlayerInput = Partial<CreatePlayerInput> & {
  status?: PlayerStatus
};
