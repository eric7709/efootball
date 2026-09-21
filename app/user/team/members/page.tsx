import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="team"
      functionName="ManageMembers"
      description="ManageMembers route for the team feature."
    />
  );
}
