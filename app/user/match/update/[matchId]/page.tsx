import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="match"
      functionName="UpdateResult"
      description="UpdateResult route for the match feature."
    />
  );
}
