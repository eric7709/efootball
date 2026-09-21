import Link from "next/link";

const stats = [
  ["24", "Active teams"],
  ["08", "Live competitions"],
  ["1,200+", "Players connected"],
];
const topPlayers = [
  ["01", "Ola Adebayo", "Lagos Titans", "2,482", "OA"],
  ["02", "Maya Okeke", "Delta Warriors", "2,371", "MO"],
  ["03", "Chinedu Obi", "Capital FC", "2,264", "CO"],
];

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="home-glow home-glow-one" />
      <div className="home-glow home-glow-two" />
      <nav className="home-nav" aria-label="Main navigation">
        <Link href="/" className="home-brand" aria-label="eFootball home">
          <span className="home-brand-mark">e</span>
          <span>
            <strong>eFootball</strong>
            <small>COMPETITIVE PLATFORM</small>
          </span>
        </Link>
        <div className="home-nav-links">
          <Link href="/competitions">Competitions</Link>
          <Link href="/teams">Teams</Link>
          <Link href="/players">Players</Link>
        </div>
        <div className="home-nav-actions">
          <Link href="/login" className="home-login">
            Log in
          </Link>
          <Link href="/signup" className="home-nav-cta">
            Join now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="home-kicker">
            <span /> THE HOME OF COMPETITIVE PLAY
          </p>
          <h1>
            Build your legacy.
            <br />
            <em>Play for more.</em>
          </h1>
          <p className="home-intro">
            Find your squad, enter the competition, and make every match count.
            The platform for serious eFootball players.
          </p>
          <div className="home-hero-actions">
            <Link href="/competitions" className="home-primary-cta">
              Explore competitions <span aria-hidden="true">→</span>
            </Link>
            <Link href="/teams" className="home-secondary-cta">
              <span className="home-play-icon" aria-hidden="true">
                ▶
              </span>{" "}
              Find a team
            </Link>
          </div>
          <div className="home-stats">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="home-hero-visual" aria-label="Live match preview">
          <div className="home-visual-grid" />
          <div className="home-orbit home-orbit-one" />
          <div className="home-orbit home-orbit-two" />
          <div className="home-match-card">
            <div className="home-match-header">
              <span className="home-live-dot" /> LIVE NOW{" "}
              <span>GROUP STAGE</span>
            </div>
            <div className="home-match-teams">
              <div>
                <div className="home-crest home-crest-titans">T</div>
                <strong>
                  Lagos
                  <br />
                  Titans
                </strong>
              </div>
              <div className="home-score">
                <strong>
                  2 <i>:</i> 1
                </strong>
                <span>62:14</span>
              </div>
              <div>
                <div className="home-crest home-crest-warriors">W</div>
                <strong>
                  Delta
                  <br />
                  Warriors
                </strong>
              </div>
            </div>
            <div className="home-match-footer">
              <span>CHAMPIONSHIP SERIES</span>
              <span>ROUND 04</span>
            </div>
          </div>
          <div className="home-floating-card home-ranking-card">
            <span>TOP RANKED</span>
            <strong>01</strong>
            <div>
              <b>Ola Adebayo</b>
              <small>2,482 pts</small>
            </div>
          </div>
          <div className="home-floating-card home-fixture-card">
            <span>NEXT FIXTURE</span>
            <strong>
              21<span>:00</span>
            </strong>
            <small>FRI, 24 OCT</small>
          </div>
        </div>
      </section>
      <section className="home-bottom-card">
        <p>YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>One place for every competitive moment.</h2>
        <Link href="/signup">
          Create your player profile <span aria-hidden="true">→</span>
        </Link>
      </section>
      <section className="home-content-section home-featured-competition">
        <div className="home-section-heading">
          <div>
            <p>FEATURED COMPETITION</p>
            <h2>
              There is still time
              <br />
              to make your mark.
            </h2>
          </div>
          <Link href="/competitions">
            View all competitions <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="home-competition-showcase">
          <div className="home-competition-art">
            <span className="home-art-ring home-art-ring-one" />
            <span className="home-art-ring home-art-ring-two" />
            <p>
              LAGOS
              <br />
              <em>eFootball</em>
              <br />
              CHAMPIONSHIP
            </p>
            <strong>2026</strong>
          </div>
          <div className="home-competition-info">
            <div className="home-active-label">
              <span /> REGISTRATION OPEN
            </div>
            <h3>
              Lagos eFootball
              <br />
              Championship
            </h3>
            <p>Sixteen teams. One city. A new name on the trophy.</p>
            <div className="home-competition-meta">
              <div>
                <span>PRIZE POOL</span>
                <strong>₦500,000</strong>
              </div>
              <div>
                <span>STARTS</span>
                <strong>10 OCT 2026</strong>
              </div>
              <div>
                <span>FORMAT</span>
                <strong>GROUP + K.O.</strong>
              </div>
            </div>
            <Link href="/signup" className="home-register-cta">
              Register your team <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="home-content-section home-results-grid">
        <article className="home-winner-card">
          <p>LAST SEASON&apos;S WINNERS</p>
          <div className="home-winner-crest">LT</div>
          <span>2025 CHAMPIONS</span>
          <h2>Lagos Titans</h2>
          <small>Defeated Delta Warriors 3—1</small>
          <Link href="/teams/team-001">
            Meet the champions <span aria-hidden="true">→</span>
          </Link>
        </article>
        <article className="home-leaderboard-card">
          <div className="home-card-title">
            <div>
              <p>PLAYER RANKINGS</p>
              <h2>Top players</h2>
            </div>
            <Link href="/players">
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="home-player-list">
            {topPlayers.map(([rank, name, team, points, initials]) => (
              <div className="home-player-row" key={rank}>
                <strong>{rank}</strong>
                <span className="home-player-avatar">{initials}</span>
                <div>
                  <b>{name}</b>
                  <small>{team}</small>
                </div>
                <em>
                  {points}
                  <small> PTS</small>
                </em>
              </div>
            ))}
          </div>
        </article>
      </section>
      <section className="home-community">
        <p>MORE THAN A SCOREBOARD</p>
        <h2>
          Find competition that
          <br />
          <em>keeps you coming back.</em>
        </h2>
        <div>
          <span>CREATE A TEAM</span>
          <span>PLAY TO RISE</span>
          <span>LEAVE A MARK</span>
        </div>
      </section>
      <footer className="home-footer">
        <Link href="/" className="home-brand">
          <span className="home-brand-mark">e</span>
          <span>
            <strong>eFootball</strong>
            <small>COMPETITIVE PLATFORM</small>
          </span>
        </Link>
        <span>© 2026 eFootball Competitive Platform</span>
        <div>
          <Link href="/competitions">Competitions</Link>
          <Link href="/teams">Teams</Link>
          <Link href="/login">Log in</Link>
        </div>
      </footer>
    </main>
  );
}
