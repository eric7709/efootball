import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";

export default function AdminNotificationsPage() {
  return (
    <RoleFunctionPage
      role="admin"
      entity="notifications"
      functionName="Notification management"
      description="Create and manage platform notifications."
    />
  );
}
