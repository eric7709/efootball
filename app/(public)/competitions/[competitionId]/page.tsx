import { competitionsDummy } from "@/features/competition/dummydata/competition.dummy";
import type { ReactNode } from "react";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

function DetailItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="competition-detail-item" style={{ padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
      <small className="muted" style={{ display: "block", marginBottom: 5 }}>{label}</small>
      <strong style={{ fontSize: 15 }}>{value}</strong>
    </div>
  );
}

export default async function CompetitionDetailsPage({ params }: { params: Promise<{ competitionId: string }> }) {
  const { competitionId } = await params;
  const competition = competitionsDummy.find((item) => item.id === competitionId);

  if (!competition) {
    return <main className="page"><section className="panel"><h1>Competition not found</h1><p className="muted">This competition may no longer be available.</p></section></main>;
  }

  const prizePool = competition.prizePool === undefined ? "Not announced" : `₦${competition.prizePool.toLocaleString("en-NG")}`;

  return (
    <main className="page competition-details-page grid" style={{ gap: 24 }}>
      <section
        className="panel competition-hero"
        style={{
          minHeight: 270,
          display: "flex",
          alignItems: "end",
          position: "relative",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div style={{ position: "relative", maxWidth: 760 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
            <span className="status-badge competition-header-badge competition-status-badge">{formatLabel(competition.status)}</span>
            <span className="status-badge competition-header-badge competition-type-badge">{formatLabel(competition.type)}</span>
            <span className="status-badge competition-header-badge competition-platform-badge">{competition.platform}</span>
          </div>
          <p className="eyebrow" style={{ margin: "0 0 8px" }}>{competition.season ?? `${competition.year} SEASON`}</p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", margin: "0 0 12px" }}>{competition.name}</h1>
          <p style={{ margin: 0, maxWidth: 680, color: "var(--muted)", lineHeight: 1.6 }}>{competition.description ?? "Competition details will be announced soon."}</p>
        </div>
      </section>

      <section className="grid grid-3">
        <div className="panel competition-stat"><small className="muted">Teams</small><h2 style={{ margin: "8px 0 0" }}>{competition.numberOfTeams}</h2></div>
        <div className="panel competition-stat"><small className="muted">Prize pool</small><h2 style={{ margin: "8px 0 0" }}>{prizePool}</h2></div>
        <div className="panel competition-stat"><small className="muted">Game mode</small><h2 style={{ margin: "8px 0 0" }}>{competition.gameMode}</h2></div>
      </section>

      <section className="grid grid-2 competition-detail-columns">
        <article className="panel">
          <p className="eyebrow" style={{ margin: 0 }}>COMPETITION DETAILS</p>
          <h2>Format and eligibility</h2>
          <DetailItem label="Competition format" value={formatLabel(competition.type)} />
          <DetailItem label="Platform" value={competition.platform} />
          <DetailItem label="Game mode" value={competition.gameMode} />
          <DetailItem label="Maximum teams" value={competition.numberOfTeams} />
          <DetailItem label="Season" value={competition.season ?? competition.year} />
          <DetailItem label="Location" value={competition.location ?? "Online / to be confirmed"} />
        </article>

        <article className="panel">
          <p className="eyebrow" style={{ margin: 0 }}>SCHEDULE</p>
          <h2>Important dates</h2>
          <DetailItem label="Registration opens" value={formatDate(competition.registrationStart)} />
          <DetailItem label="Registration closes" value={formatDate(competition.registrationEnd)} />
          <DetailItem label="Competition starts" value={formatDate(competition.startDate)} />
          <DetailItem label="Competition ends" value={formatDate(competition.endDate)} />
          <DetailItem label="Competition year" value={competition.year} />
          <DetailItem label="Current status" value={formatLabel(competition.status)} />
        </article>
      </section>

      <section className="panel">
        <p className="eyebrow" style={{ margin: 0 }}>RECORD</p>
        <div className="grid grid-3" style={{ marginTop: 8 }}>
          <DetailItem label="Competition ID" value={competition.id} />
          <DetailItem label="Created" value={formatDate(competition.createdAt)} />
          <DetailItem label="Last updated" value={formatDate(competition.updatedAt)} />
        </div>
      </section>
    </main>
  );
}
