import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";

export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="competitionTeamStatistics"
      functionName="ViewStatistics"
      description="View statistics for a competition team."
    />
  );
}
