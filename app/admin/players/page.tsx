import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";

export default function AdminPlayersPage() {
  return <RoleFunctionPage role="admin" entity="players" functionName="Player management" description="Manage player accounts and platform eligibility." />;
}
