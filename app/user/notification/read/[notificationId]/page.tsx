import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="notification"
      functionName="MarkRead"
      description="MarkRead route for the notification feature."
    />
  );
}
