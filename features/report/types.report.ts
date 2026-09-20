export type ReportTargetType = "PLAYER" | "TEAM" | "MATCH" | "COMPETITION";
export type ReportStatus = "OPEN" | "UNDER_REVIEW" | "RESOLVED" | "REJECTED";
export interface Report {
  id:string
  reporterId:string
  targetType:ReportTargetType
  targetId:string
  reason:string
  description?:string
  status:ReportStatus
  createdAt:string
  resolvedBy?:string
  resolutionNote?:string
}
export interface CreateReportInput {
  reporterId:string
  targetType:ReportTargetType
  targetId:string
  reason:string
  description?:string
}
export interface UpdateReportInput {
  status?:ReportStatus
  resolutionNote?:string
  resolvedBy?:string
}
