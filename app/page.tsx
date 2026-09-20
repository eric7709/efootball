import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page">
      <p style={{ color: "var(--primary)", fontWeight: 700 }}>EFOOTBALL COMPETITIVE PLATFORM</p>
      <h1 style={{ fontSize: 48, marginBottom: 12 }}>Players. Teams. Competitions.</h1>
      <p style={{ color: "var(--muted)", maxWidth: 700, lineHeight: 1.7 }}>
        A scalable feature-based Next.js starter with strongly typed entities, dummy data,
        function-specific forms, stores, hooks and small single-responsibility components.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
        <Link href="/competitions" className="panel">Competitions</Link>
        <Link href="/teams" className="panel">Teams</Link>
        <Link href="/players" className="panel">Players</Link>
        <Link href="/admin/dashboard" className="panel">Admin</Link>
      </div>
    </main>
  );
}
