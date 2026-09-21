import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="matchEvidence"
      functionName="SubmitEvidence"
      description="SubmitEvidence route for the matchEvidence feature."
    />
  );
}
