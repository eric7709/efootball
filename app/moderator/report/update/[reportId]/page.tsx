import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="report"
      functionName="UpdateReport"
      description="UpdateReport route for the report feature."
    />
  );
}
