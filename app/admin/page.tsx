import Link from "next/link";

const sections = [
  ["players", "Players"],
  ["teams", "Teams"],
  ["competitions", "Competitions"],
  ["matches", "Matches"],
  ["reports", "Reports"],
  ["rankings", "Rankings"],
  ["notifications", "Notifications"],
];

export default function AdminHomePage() {
  return (
    <main className="page">
      <p className="eyebrow">ADMIN</p>
      <h1>Management</h1>
      <div className="grid grid-3">
        {sections.map(([href, label]) => (
          <Link className="panel" href={`/admin/${href}`} key={href}>
            <h2>{label}</h2>
            <p className="muted">Open {label.toLowerCase()} table</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
