import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="achievement"
      functionName="ViewAchievements"
      description="ViewAchievements route for the achievement feature."
    />
  );
}
