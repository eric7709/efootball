"use client";

import { usePlayers } from "@/features/player/hooks/api.player";
import { useMatches } from "@/features/match/hooks/api.match";
import { teamsDummy } from "@/features/team/dummydata/team.dummy";

export default function UserDashboardPage() {
  const player = usePlayers().data?.[0];
  const matches = useMatches();
  const matchList = matches.data ?? [];
  const completedMatches = matchList.filter(
    (match) => match.status === "COMPLETED",
  );

  return (
    <main className="page">
      <p style={{ color: "var(--primary)" }}>PLAYER DASHBOARD</p>
      <h1>Welcome, {player?.gamerTag ?? "Player"}</h1>
      <div className="grid grid-3">
        <div className="panel">
          <small>Matches</small>
          <h2>{matchList.length || "—"}</h2>
        </div>
        <div className="panel">
          <small>Completed</small>
          <h2>{completedMatches.length || "—"}</h2>
        </div>
        <div className="panel">
          <small>Upcoming</small>
          <h2>
            {matchList.filter((match) => match.status === "SCHEDULED").length ||
              "—"}
          </h2>
        </div>
      </div>
      <h2>Teams</h2>
      <div className="grid">
        {teamsDummy.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
      <h2>Recent Matches</h2>
      <div className="grid">
        {matches.data?.map((match) => (
          <div className="panel" key={match.id}>
            {match.homeTeamId} {match.homeScore ?? "-"} —{" "}
            {match.awayScore ?? "-"} {match.awayTeamId}
          </div>
        ))}
      </div>
    </main>
  );
}

function TeamCard({ team }: { team: (typeof teamsDummy)[number] }) {
  return (
    <div className="panel">
      {team.name} · Strength {team.strength}
    </div>
  );
}
