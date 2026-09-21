"use client";

import { useMatches } from "@/features/match/hooks/api.match";

import { useUpdateMatch } from "@/features/match/hooks/api.match";

export default function ModeratorDashboardPage() {
  const matches = useMatches();
  const update = useUpdateMatch();
  const completed =
    matches.data?.filter((match) => match.status === "COMPLETED") ?? [];

  return (
    <main className="page">
      <p style={{ color: "var(--primary)" }}>MODERATOR DASHBOARD</p>
      <h1>Match Verification</h1>
      {matches.isLoading && <p>Loading matches...</p>}
      {matches.isError && <p>Unable to load matches.</p>}
      <div className="grid">
        {completed.map((match) => (
          <div className="panel" key={match.id}>
            <strong>
              {match.homeTeamId} {match.homeScore ?? "-"} —{" "}
              {match.awayScore ?? "-"} {match.awayTeamId}
            </strong>
            <p style={{ color: "var(--muted)" }}>
              Result submitted for moderation.
            </p>
            <button
              disabled={update.isPending}
              onClick={() =>
                update.mutate({ id: match.id, input: { status: "COMPLETED" } })
              }
            >
              Approve result
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
