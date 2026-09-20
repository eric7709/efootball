import Link from "next/link";

import { teamsDummy } from "@/features/team/dummydata/team.dummy";
export default function TeamsPage(){return <main className="page"><Link href="/">← Home</Link><h1>Teams</h1><div className="grid">{teamsDummy.map(t=><Link href={`/teams/${t.id}`} className="panel" key={t.id}><strong>{t.name}</strong><span style={{float:"right"}}>Strength {t.strength}</span></Link>)}</div></main>;}
