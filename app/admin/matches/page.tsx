import { Suspense } from "react";

import { MatchesAdminPage } from "@/features/match/roles/admin/manageMatch/viewMatch/MatchesAdminPage";

export default function AdminMatchesPage() {
  return (
    <main className="page">
      <Suspense fallback={<p>Loading matches...</p>}>
        <MatchesAdminPage />
      </Suspense>
    </main>
  );
}
