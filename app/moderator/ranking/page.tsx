import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="ranking"
      functionName="ViewRankings"
      description="ViewRankings route for the ranking feature."
    />
  );
}
