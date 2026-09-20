export type EvidenceStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface MatchEvidence {
  id:string
  matchId:string
  submittedBy:string
  imageUrl:string
  notes?:string
  submittedAt:string
  status:EvidenceStatus
  reviewerId?:string
  reviewedAt?:string
}
export interface SubmitMatchEvidenceInput {
  matchId:string
  submittedBy:string
  imageUrl:string
  notes?:string
}
export interface ReviewMatchEvidenceInput {
  status:"APPROVED"|"REJECTED"
  reviewerId:string
}
