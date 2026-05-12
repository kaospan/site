import { useMemo, useState } from 'react';
import { releases, releaseTabLabels } from './data/releases';
import { story } from './data/story';
import './styles.css';

function Badge({ children, tone = 'default' }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children && <p className="section-copy">{children}</p>}
      </div>
    </div>
  );
}

function StoryOverview() {
  return (
    <section id="story">
      <SectionIntro eyebrow="what this is" title={story.headline}>
        {story.shortVersion}
      </SectionIntro>
      <div className="grid three">
        <article className="card callout">
          <p className="eyebrow">current status</p>
          <h3>{story.currentStatus}</h3>
        </article>
        <article className="card callout">
          <p className="eyebrow">simple surface</p>
          <h3>Separate artists. Separate sounds.</h3>
          <p>The site should be easy first. A visitor can understand each artist without knowing the hidden split.</p>
        </article>
        <article className="card callout">
          <p className="eyebrow">hidden layer</p>
          <h3>One pressure system underneath.</h3>
          <p>{story.coreIdea}</p>
        </article>
      </div>
    </section>
  );
}

function PersonaGrid() {
  return (
    <section id="personas">
      <SectionIntro eyebrow="who is who" title="Four roles, explained simply." />
      <div className="grid four">
        {story.personas.map((persona) => (
          <article className="card" key={persona.name}>
            <p className="eyebrow">{persona.simple}</p>
            <h3>{persona.name}</h3>
            <p>{persona.explanation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ConnectionMap() {
  return (
    <section id="connections">
      <SectionIntro eyebrow="how it connects" title="The story in order." />
      <div className="timeline">
        {story.howItConnects.map((item, index) => (
          <article className="step" key={item.title}>
            <span>{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReleaseCard({ release, onSelect, active }) {
  return (
    <article className={`card release-card ${active ? 'active-card' : ''}`}>
      <div className="badges">
        <Badge tone={release.status === 'Released' ? 'released' : 'planned'}>{release.status}</Badge>
        <Badge>{release.artist}</Badge>
      </div>
      <p className="eyebrow">{release.phase}</p>
      <h3>{release.title}</h3>
      <p className="muted">{release.date}</p>
      <p>{release.summary}</p>
      <button onClick={() => onSelect(release.id)}>Open details</button>
    </article>
  );
}

function ReleaseDetail({ release }) {
  const [tab, setTab] = useState('meaning');
  return (
    <section className="card detail-card">
      <div className="badges">
        <Badge tone={release.status === 'Released' ? 'released' : 'planned'}>{release.status}</Badge>
        <Badge>{release.artist}</Badge>
        <Badge>{release.phase}</Badge>
      </div>
      <h2>{release.title}</h2>
      <p className="muted">{release.date}</p>
      <p>{release.summary}</p>
      <p className="lineage">{release.lineage}</p>
      <div className="tabs" aria-label="Release detail tabs">
        {Object.entries(releaseTabLabels).map(([key, label]) => (
          <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>
      <div className="panel">
        <h3>{releaseTabLabels[tab]}</h3>
        <p>{release.tabs[tab]}</p>
      </div>
    </section>
  );
}

function Rules() {
  return (
    <section id="rules">
      <SectionIntro eyebrow="site rules" title="Keep the public page clear." />
      <div className="card">
        <ul className="rules-list">
          {story.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState('i-dont-play');
  const [query, setQuery] = useState('');
  const selected = releases.find((release) => release.id === selectedId) ?? releases[0];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return releases;
    return releases.filter((release) => JSON.stringify(release).toLowerCase().includes(needle));
  }, [query]);

  return (
    <main>
      <nav className="nav">
        <div>
          <strong>PEAK UNIVERSE</strong>
          <span>clear story map</span>
        </div>
        <div className="nav-links">
          <a href="#story">Story</a>
          <a href="#personas">Personas</a>
          <a href="#connections">Connections</a>
          <a href="#releases">Releases</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">current canon</p>
          <h1>I Don’t Play is released.</h1>
          <p>{story.shortVersion}</p>
          <div className="badges">
            <Badge tone="released">PEAKSON</Badge>
            <Badge>post-release phase</Badge>
            <Badge>Reckless = draft history</Badge>
          </div>
        </div>
        <ReleaseDetail release={selected} />
      </section>

      <StoryOverview />
      <PersonaGrid />
      <ConnectionMap />

      <section id="releases">
        <div className="section-head split">
          <div>
            <p className="eyebrow">release archive</p>
            <h2>Each release has one clear job.</h2>
            <p className="section-copy">Open a release to see its lyrics note, meaning, album role, project role, file notes, and canon notes.</p>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search releases, files, roles..." />
        </div>
        <div className="grid three">
          {filtered.map((release) => (
            <ReleaseCard key={release.id} release={release} active={release.id === selectedId} onSelect={setSelectedId} />
          ))}
        </div>
      </section>

      <Rules />
    </main>
  );
}
