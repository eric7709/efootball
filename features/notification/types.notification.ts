export interface Notification {
  id:string
  userId:string
  title:string
  message:string
  read:boolean
  createdAt:string
  type:"MATCH"|"COMPETITION"|"TEAM"|"SYSTEM"
}
export interface CreateNotificationInput {
  userId:string
  title:string
  message:string
  type:Notification["type"]
}
