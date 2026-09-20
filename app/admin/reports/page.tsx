import { RoleFunctionPage } from "@/features/shared/routes/RoleFunctionPage";

export default function AdminReportsPage() {
  return <RoleFunctionPage role="admin" entity="reports" functionName="Report management" description="Review reports submitted by platform users." />;
}
