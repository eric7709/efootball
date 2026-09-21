import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="report"
      functionName="ResolveReport"
      description="ResolveReport route for the report feature."
    />
  );
}
