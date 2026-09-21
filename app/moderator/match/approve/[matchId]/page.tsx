import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="match"
      functionName="ApproveResult"
      description="ApproveResult route for the match feature."
    />
  );
}
