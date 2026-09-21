import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="report"
      functionName="ViewReports"
      description="ViewReports route for the report feature."
    />
  );
}
