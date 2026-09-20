import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";

export default function AdminRankingsPage() {
  return <RoleFunctionPage role="admin" entity="rankings" functionName="Ranking management" description="Review and recalculate player rankings." />;
}
