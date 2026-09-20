import { playersDummy } from "@/features/player/dummydata/player.dummy";
export default function PlayersPage(){return <main className="page"><h1>Players</h1><div className="grid grid-3">{playersDummy.map(p=><div className="panel" key={p.id}><h3>{p.gamerTag}</h3><p>{p.country} · {p.platform}</p></div>)}</div></main>;}
