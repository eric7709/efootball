import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="playerStatistics"
      functionName="ViewStatistics"
      description="ViewStatistics route for the playerStatistics feature."
    />
  );
}
