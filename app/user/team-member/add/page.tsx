import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="teamMember"
      functionName="AddMember"
      description="AddMember route for the teamMember feature."
    />
  );
}
