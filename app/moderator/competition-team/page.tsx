import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="competitionTeam"
      functionName="ViewRegistrations"
      description="ViewRegistrations route for the competitionTeam feature."
    />
  );
}
