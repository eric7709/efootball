import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="teamMember"
      functionName="RemoveMember"
      description="RemoveMember route for the teamMember feature."
    />
  );
}
