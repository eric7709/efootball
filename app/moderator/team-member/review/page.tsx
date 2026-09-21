import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="teamMember"
      functionName="ReviewMembers"
      description="ReviewMembers route for the teamMember feature."
    />
  );
}
