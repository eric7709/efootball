import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="teamMember"
      functionName="ViewMembers"
      description="ViewMembers route for the teamMember feature."
    />
  );
}
