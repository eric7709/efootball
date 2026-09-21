import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="match"
      functionName="ViewMatches"
      description="ViewMatches route for the match feature."
    />
  );
}
