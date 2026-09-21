import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="notification"
      functionName="ViewNotifications"
      description="ViewNotifications route for the notification feature."
    />
  );
}
