import Link from "next/link";

import { matchesDummy } from "@/features/match/dummydata/match.dummy";
import { teamsDummy } from "@/features/team/dummydata/team.dummy";

export default async function TeamDetailsPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;
  const t = teamsDummy.find((x) => x.id === teamId);
  if (!t) {
    return (
      <main className="page">
        <h1>Team not found</h1>
      </main>
    );
  }

  const teamMatches = matchesDummy.filter(
    (match) => match.homeTeamId === t.id || match.awayTeamId === t.id,
  );
  const completedMatches = teamMatches.filter(
    (match) => match.status === "COMPLETED",
  );
  const wins = completedMatches.filter(
    (match) => match.winnerId === t.id,
  ).length;
  const draws = completedMatches.filter(
    (match) =>
      match.homeScore !== undefined &&
      match.awayScore !== undefined &&
      match.homeScore === match.awayScore,
  ).length;
  const losses = completedMatches.length - wins - draws;
  const goalsFor = completedMatches.reduce(
    (total, match) =>
      total +
      (match.homeTeamId === t.id
        ? (match.homeScore ?? 0)
        : (match.awayScore ?? 0)),
    0,
  );
  const goalsAgainst = completedMatches.reduce(
    (total, match) =>
      total +
      (match.homeTeamId === t.id
        ? (match.awayScore ?? 0)
        : (match.homeScore ?? 0)),
    0,
  );
  const upcomingMatch = teamMatches.find(
    (match) => match.status === "SCHEDULED",
  );

  const stats = [
    { label: "Matches", value: completedMatches.length },
    { label: "Wins", value: wins },
    { label: "Draws", value: draws },
    { label: "Losses", value: losses },
    { label: "Goals for", value: goalsFor },
    { label: "Goals against", value: goalsAgainst },
  ];

  return (
    <main className="page">
      <Link href="/teams" className="team-details-back">
        ← All teams
      </Link>

      <section className="team-details-hero">
        <div>
          <span className="eyebrow">{t.country.toUpperCase()}</span>
          <h1>{t.name}</h1>
          <p className="team-details-subtitle">
            {t.tag} · {t.region ?? "Independent team"}
          </p>
          <p className="muted">
            {t.description ?? "Competitive eFootball team."}
          </p>
        </div>
        <div className="team-strength-badge">
          <span>Strength</span>
          <strong>{t.strength}</strong>
        </div>
      </section>

      <section className="team-stat-grid" aria-label="Team statistics">
        {stats.map((stat) => (
          <div className="team-stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </section>

      <section className="team-details-content">
        <div className="panel">
          <div className="team-section-heading">
            <div>
              <span className="eyebrow">FORM</span>
              <h2>Recent record</h2>
            </div>
            <strong>
              {completedMatches.length
                ? `${Math.round((wins / completedMatches.length) * 100)}% win rate`
                : "No completed matches"}
            </strong>
          </div>
          <div
            className="team-record-bar"
            aria-label="Win, draw, and loss record"
          >
            <span style={{ flex: Math.max(wins, 0.25) }} className="win" />
            <span style={{ flex: Math.max(draws, 0.25) }} className="draw" />
            <span style={{ flex: Math.max(losses, 0.25) }} className="loss" />
          </div>
          <div className="team-record-legend">
            <span>
              <i className="win" /> {wins} wins
            </span>
            <span>
              <i className="draw" /> {draws} draws
            </span>
            <span>
              <i className="loss" /> {losses} losses
            </span>
          </div>
        </div>

        <div className="panel">
          <span className="eyebrow">NEXT FIXTURE</span>
          <h2>{upcomingMatch ? "Match scheduled" : "No upcoming matches"}</h2>
          {upcomingMatch ? (
            <p className="muted">
              {upcomingMatch.homeTeamId === t.id
                ? "Home fixture"
                : "Away fixture"}
              {" · "}
              {new Intl.DateTimeFormat("en", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(upcomingMatch.scheduledAt))}
            </p>
          ) : (
            <p className="muted">
              The schedule will appear here when a fixture is added.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
