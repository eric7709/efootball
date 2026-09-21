import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="competition"
      functionName="WithdrawTeam"
      description="WithdrawTeam route for the competition feature."
    />
  );
}
