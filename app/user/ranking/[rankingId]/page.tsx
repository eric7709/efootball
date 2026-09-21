import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";
export default function Page() {
  return (
    <RoleFunctionPage
      role="user"
      entity="ranking"
      functionName="ViewRanking"
      description="ViewRanking route for the ranking feature."
    />
  );
}
