import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";

export default function Page() {
  return (
    <RoleFunctionPage
      role="moderator"
      entity="competitionTeamStatistics"
      functionName="ReviewStatistics"
      description="Review statistics for teams in a competition."
    />
  );
}
