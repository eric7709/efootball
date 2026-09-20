import Link from "next/link";

import { competitionsDummy } from "@/features/competition/dummydata/competition.dummy";

export default function CompetitionsPage() {
  return <main className="page"><Link href="/">← Home</Link><h1>Competitions</h1>
    <div className="grid">{competitionsDummy.map(c=><Link className="panel" href={`/competitions/${c.id}`} key={c.id}>
      <h2>{c.name}</h2><p>{c.year} · {c.numberOfTeams} teams · {c.status}</p>
    </Link>)}</div>
  </main>;
}
