import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="matchEvidence"
      functionName="ViewEvidence"
      description="ViewEvidence route for the matchEvidence feature."
    />
  );
}
