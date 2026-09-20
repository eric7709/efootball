import { teamsDummy } from "@/features/team/dummydata/team.dummy";

import { teamMembersDummy } from "@/features/teamMember/dummydata/team-member.dummy";
export default async function TeamDetailsPage({params}:{params:Promise<{teamId:string}>}){const {teamId}=await params;const t = teamsDummy.find(x=>x.id===teamId);if(!t)return <main className="page"><h1>Team not found</h1></main>;const members = teamMembersDummy.filter(m=>m.teamId===t.id);return <main className="page"><h1>{t.name}</h1><p>{t.tag} · Strength {t.strength} · Rating {t.competitiveRating}</p><h2>Members</h2><div className="grid">{members.map(m=><div className="panel" key={m.id}>{m.playerId} · {m.role}</div>)}</div></main>;}
