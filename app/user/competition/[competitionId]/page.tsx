import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="competition"
      functionName="ViewCompetition"
      description="ViewCompetition route for the competition feature."
    />
  );
}
