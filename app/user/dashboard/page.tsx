"use client";

import { usePlayers } from "@/features/player/hooks/usePlayers";

import { usePlayerTeams } from "@/features/teamMember/hooks/usePlayerTeams";

import { useTeam } from "@/features/team/hooks/useTeam";

import { usePlayerStatistics } from "@/features/playerStatistics/hooks/usePlayerStatistics";

import { useMatches } from "@/features/match/hooks/useMatches";

export default function UserDashboardPage() {
  const player = usePlayers().data?.[0];
  const memberships = usePlayerTeams(player?.id ?? "");
  const statistics = usePlayerStatistics(player?.id ?? "");
  const matches = useMatches();
  const teams = memberships.data ?? [];

  return <main className="page">
    <p style={{ color: "var(--primary)" }}>PLAYER DASHBOARD</p>
    <h1>Welcome, {player?.gamerTag ?? "Player"}</h1>
    <div className="grid grid-3">
      <div className="panel"><small>Matches</small><h2>{statistics.data?.matchesPlayed ?? "—"}</h2></div>
      <div className="panel"><small>Win rate</small><h2>{statistics.data?.winRate ?? "—"}%</h2></div>
      <div className="panel"><small>Trophies</small><h2>{statistics.data?.trophies ?? "—"}</h2></div>
    </div>
    <h2>My Teams</h2>
    <div className="grid">{teams.map((membership) => <TeamCard key={membership.id} teamId={membership.teamId} />)}</div>
    <h2>Recent Matches</h2>
    <div className="grid">{matches.data?.map((match) => <div className="panel" key={match.id}>
      {match.homeTeamId} {match.homeScore ?? "-"} — {match.awayScore ?? "-"} {match.awayTeamId}
    </div>)}</div>
  </main>;
}

function TeamCard({ teamId }: { teamId: string }) {
  const query = useTeam(teamId);
  if (query.isLoading) return <div className="panel">Loading team...</div>;
  return <div className="panel">{query.data?.name} · Strength {query.data?.strength}</div>;
}
