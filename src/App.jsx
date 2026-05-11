import { useMemo, useState } from 'react';
import { releases, releaseTabLabels } from './data/releases';
import { personas } from './data/personas';
import './styles.css';

function Badge({ children, tone = 'default' }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function ReleaseCard({ release, onSelect }) {
  return (
    <article className="card release-card">
      <div className="badges">
        <Badge tone={release.status === 'Released' ? 'released' : 'planned'}>{release.status}</Badge>
        <Badge>{release.artist}</Badge>
      </div>
      <p className="eyebrow">{release.phase}</p>
      <h3>{release.title}</h3>
      <p className="muted">{release.date}</p>
      <p>{release.summary}</p>
      <button onClick={() => onSelect(release.id)}>Open release</button>
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
      <div className="tabs">
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

function PersonaGrid() {
  return (
    <section>
      <p className="eyebrow">personas</p>
      <h2>Separate public artists. One hidden fracture.</h2>
      <div className="grid four">
        {personas.map((persona) => (
          <article className="card" key={persona.name}>
            <h3>{persona.name}</h3>
            <p className="muted">{persona.domain}</p>
            <p>{persona.description}</p>
          </article>
        ))}
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
          <span>Vite canon site</span>
        </div>
        <a href="#releases">Releases</a>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">current canon</p>
          <h1>I Don’t Play is released.</h1>
          <p>
            The project is past Reckless. Reckless is draft lineage; I Don’t Play is the active public PEAKSON statement.
          </p>
          <div className="badges">
            <Badge tone="released">PEAKSON</Badge>
            <Badge>post-release phase</Badge>
            <Badge>canon corrected</Badge>
          </div>
        </div>
        <ReleaseDetail release={selected} />
      </section>

      <section id="releases">
        <div className="section-head">
          <div>
            <p className="eyebrow">release archive</p>
            <h2>Releases and planned records</h2>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search releases, files, roles..." />
        </div>
        <div className="grid">
          {filtered.map((release) => (
            <ReleaseCard key={release.id} release={release} onSelect={setSelectedId} />
          ))}
        </div>
      </section>

      <PersonaGrid />
    </main>
  );
}
