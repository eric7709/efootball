import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="team"
      functionName="SuspendTeam"
      description="SuspendTeam route for the team feature."
    />
  );
}
