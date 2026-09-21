import { Suspense } from "react";

import { CompetitionAdminPage } from "@/features/competition/roles/admin/manageCompetition/viewCompetition/CompetitionAdminPage";

export default function AdminCompetitionsPage() {
  return (
    <main className="page">
      <Suspense fallback={<p>Loading competitions...</p>}>
        <CompetitionAdminPage />
      </Suspense>
    </main>
  );
}
