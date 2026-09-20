export type RankingCategory = "GLOBAL" | "COUNTRY" | "REGION" | "PLATFORM";
export interface Ranking {
  id:string
  playerId:string
  rating:number
  position:number
  category:RankingCategory
  region?:string
  platform?:string
}
