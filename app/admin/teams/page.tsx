import { Suspense } from "react";

import { TeamsAdminPage } from "@/features/team/roles/admin/manageTeam/viewTeam/TeamsAdminPage";
export default function AdminTeamsPage() {
  return (
    <main className="page">
      <Suspense fallback={<p>Loading teams...</p>}>
        <TeamsAdminPage />
      </Suspense>
    </main>
  );
}
