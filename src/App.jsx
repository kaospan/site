import { useMemo, useState } from 'react';
import { releases, releaseTabLabels } from './data/releases';
import { story } from './data/story';
import { albums, getAlbumStats } from './data/albums';
import { clues } from './data/clues';
import { trilogy } from './data/trilogy';
import { chronology, chronologicalReleaseIds } from './data/chronology';
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

function getReleaseForTitle(title) {
  return releases.find((release) => release.title.toLowerCase() === title.toLowerCase());
}

function getLyricsText(item) {
  if (item?.lyricsFull) return item.lyricsFull;
  if (item?.tabs?.lyrics) return item.tabs.lyrics;
  const matchedRelease = item?.title ? getReleaseForTitle(item.title) : null;
  if (matchedRelease?.lyricsFull) return matchedRelease.lyricsFull;
  if (matchedRelease?.tabs?.lyrics) return matchedRelease.tabs.lyrics;
  return 'Full lyrics are not added to the site yet. Add approved final lyrics here after the song is locked.';
}

function LyricsToggle({ item, label = 'Lyrics' }) {
  const [open, setOpen] = useState(false);
  const lyrics = getLyricsText(item);
  return (
    <div className="lyrics-toggle">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {open ? 'Hide lyrics' : `Show ${label.toLowerCase()}`}
      </button>
      {open && <pre className="lyrics-panel">{lyrics}</pre>}
    </div>
  );
}

function ChronologyPage() {
  return (
    <section id="chronology">
      <SectionIntro eyebrow="chronological story" title="Read the releases in order.">
        This is the clearest way to follow the surface story first, then notice the hidden connection between the artists.
      </SectionIntro>
      <div className="timeline chronology-timeline">
        {chronology.map((item) => (
          <article className="step chronology-step" key={`${item.order}-${item.title}`}>
            <span>{item.order}</span>
            <div>
              <p className="eyebrow">{item.date} · {item.artist}</p>
              <h3>{item.title}</h3>
              <p className="track-date">{item.phase}</p>
              <dl>
                <dt>Surface story</dt>
                <dd>{item.surface}</dd>
                <dt>Hidden meaning</dt>
                <dd>{item.hidden}</dd>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrilogyOverview() {
  return (
    <section id="trilogy">
      <SectionIntro eyebrow="trilogy overview" title={trilogy.title}>
        {trilogy.premise}
      </SectionIntro>
      <div className="story-block hidden-truth">
        <p className="eyebrow">one hidden truth</p>
        <p>{trilogy.hiddenTruth}</p>
      </div>
      <div className="grid three">
        {trilogy.surfaceStories.map((item) => (
          <article className="card trilogy-story-card" key={item.artist}>
            <p className="eyebrow">{item.role}</p>
            <h3>{item.artist} — {item.album}</h3>
            <p>{item.hook}</p>
            <dl>
              <dt>Beginning</dt>
              <dd>{item.beginning}</dd>
              <dt>Middle</dt>
              <dd>{item.middle}</dd>
              <dt>Twist</dt>
              <dd>{item.twist}</dd>
              <dt>Ending</dt>
              <dd>{item.ending}</dd>
              <dt>Hidden connection</dt>
              <dd>{item.hiddenConnection}</dd>
            </dl>
          </article>
        ))}
      </div>
      <div className="timeline trilogy-arc">
        {trilogy.combinedArc.map((item) => (
          <article className="step" key={item.step}>
            <span>{item.step}</span>
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

function StoryOverview() {
  return (
    <section id="story">
      <SectionIntro eyebrow="what this is" title={story.headline}>
        {story.shortVersion}
      </SectionIntro>
      <div className="grid three">
        <article className="card callout">
          <p className="eyebrow">one-line story</p>
          <h3>{story.oneLineStory}</h3>
        </article>
        <article className="card callout">
          <p className="eyebrow">current status</p>
          <h3>{story.currentStatus}</h3>
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

function VisitorPath() {
  return (
    <section id="guide">
      <SectionIntro eyebrow="reading guide" title="How to understand the project." >
        {story.audiencePromise}
      </SectionIntro>
      <div className="grid three">
        {story.visitorPath.map((item) => (
          <article className="card" key={item.title}>
            <p className="eyebrow">{item.label}</p>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
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
          <article className="card persona-card" key={persona.name}>
            <p className="eyebrow">{persona.simple}</p>
            <h3>{persona.name}</h3>
            <p>{persona.explanation}</p>
            <dl>
              <dt>Public face</dt>
              <dd>{persona.publicFace}</dd>
              <dt>Hidden role</dt>
              <dd>{persona.hiddenRole}</dd>
              <dt>Sound</dt>
              <dd>{persona.sound}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function HiddenMechanics() {
  return (
    <section id="mechanics">
      <SectionIntro eyebrow="hidden mechanics" title="What to notice as the project grows." />
      <div className="grid four">
        {story.hiddenMechanics.map((item) => (
          <article className="card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CluesPage() {
  return (
    <section id="clues">
      <SectionIntro eyebrow="clue archive" title="Clues that uncover the hidden meanings." >
        Each clue can be read on the surface first, then as part of the deeper connection between the songs and artists.
      </SectionIntro>
      <div className="clue-grid">
        {clues.map((clue) => (
          <article className="card clue-card" key={clue.id}>
            <h3>{clue.title}</h3>
            <div className="badges">
              {clue.visibleIn.map((item) => <Badge key={item}>{item}</Badge>)}
            </div>
            <dl>
              <dt>Surface clue</dt>
              <dd>{clue.surface}</dd>
              <dt>Hidden meaning</dt>
              <dd>{clue.hidden}</dd>
              <dt>What it reveals</dt>
              <dd>{clue.reveals}</dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function AlbumStatus({ album }) {
  const stats = getAlbumStats(album);
  return (
    <article className="card album-card">
      <div className="album-head">
        <div>
          <p className="eyebrow">{album.artist}</p>
          <h3>{album.title}</h3>
        </div>
        <Badge tone={stats.remainingToRelease === 0 ? 'released' : 'planned'}>{stats.percentReleased}% released</Badge>
      </div>
      <p>{album.story}</p>
      <p className="muted">{album.connection}</p>
      <div className="story-block">
        <p className="eyebrow">surface story</p>
        <p>{album.surfaceStory}</p>
      </div>
      <div className="story-block hidden-truth">
        <p className="eyebrow">underlying truth</p>
        <p>{album.hiddenTruth}</p>
      </div>
      <div className="act-grid">
        {album.acts.map((act) => (
          <article className="act-card" key={act.label}>
            <p className="eyebrow">{act.tracks}</p>
            <h4>{act.label}</h4>
            <p>{act.summary}</p>
          </article>
        ))}
      </div>
      <div className="progress-wrap" aria-label={`${album.title} completion`}>
        <div className="progress-bar" style={{ width: `${stats.percentReleased}%` }} />
      </div>
      <div className="stat-grid">
        <ReadCard label="released">{stats.released} / {album.totalTracks}</ReadCard>
        <ReadCard label="planned / locked">{stats.planned}</ReadCard>
        <ReadCard label="remain to release">{stats.remainingToRelease}</ReadCard>
        <ReadCard label="remain to write">{stats.remainingToWrite}</ReadCard>
      </div>
      <ol className="track-list">
        {album.tracks.map((track) => (
          <li key={`${album.id}-${track.n}`}>
            <div>
              <strong>{track.n}. {track.title}</strong>
              <p className="track-date">Release date: {track.releaseDate}</p>
              <p>{track.role}</p>
              <LyricsToggle item={track} label="lyrics" />
            </div>
            <Badge tone={track.status === 'Released' ? 'released' : track.status === 'Planned' || track.status === 'Locked soon' ? 'planned' : 'default'}>{track.status}</Badge>
          </li>
        ))}
      </ol>
    </article>
  );
}

function AlbumsPage() {
  const totalTracks = albums.reduce((sum, album) => sum + album.totalTracks, 0);
  const released = albums.reduce((sum, album) => sum + getAlbumStats(album).released, 0);
  const remaining = totalTracks - released;
  return (
    <section id="albums">
      <SectionIntro eyebrow="full-length albums" title="Three complete stories that connect." >
        Each album works as its own surface thriller. Underneath, all three tell one hidden story: mask, evidence, and body memory.
      </SectionIntro>
      <div className="card trilogy-card">
        <p className="eyebrow">trilogy status</p>
        <h3>{released} of {totalTracks} songs released. {remaining} songs remain to release the full three-album story.</h3>
      </div>
      <div className="album-grid">
        {albums.map((album) => <AlbumStatus album={album} key={album.id} />)}
      </div>
    </section>
  );
}

function ReleaseCard({ release, onSelect, active }) {
  return (
    <article className={`card release-card ${active ? 'active-card' : ''}`}>
      <div className="badges">
        <Badge tone={release.status === 'Released' ? 'released' : release.status === 'Planned' || release.status === 'Locked soon' ? 'planned' : 'default'}>{release.status}</Badge>
        <Badge>{release.artist}</Badge>
      </div>
      <p className="eyebrow">{release.phase}</p>
      <h3>{release.title}</h3>
      <p className="muted">Release date: {release.releaseDate ?? release.date}</p>
      <p>{release.job ?? release.summary}</p>
      <LyricsToggle item={release} label="lyrics" />
      <button onClick={() => onSelect(release.id)}>Open details</button>
    </article>
  );
}

function ReadCard({ label, children }) {
  return (
    <article className="read-card">
      <p className="eyebrow">{label}</p>
      <p>{children}</p>
    </article>
  );
}

function ReleaseDetail({ release, compact = false }) {
  const [tab, setTab] = useState('meaning');
  return (
    <section className={`card detail-card ${compact ? 'inline-detail' : ''}`} id={compact ? 'selected-release-detail' : undefined}>
      <div className="badges">
        <Badge tone={release.status === 'Released' ? 'released' : release.status === 'Planned' || release.status === 'Locked soon' ? 'planned' : 'default'}>{release.status}</Badge>
        <Badge>{release.artist}</Badge>
        <Badge>{release.phase}</Badge>
      </div>
      <h2>{release.title}</h2>
      <p className="muted">Release date: {release.releaseDate ?? release.date}</p>
      <p>{release.summary}</p>
      <LyricsToggle item={release} label="lyrics" />
      <div className="read-grid">
        <ReadCard label="job">{release.job}</ReadCard>
        <ReadCard label="public read">{release.audienceRead}</ReadCard>
        <ReadCard label="hidden read">{release.hiddenRead}</ReadCard>
      </div>
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
      <div className="grid two">
        <div className="card">
          <h3>Public page rules</h3>
          <ul className="rules-list">
            {story.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Rollout priorities</h3>
          <ul className="rules-list">
            {story.rolloutPriorities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState('i-dont-play');
  const [query, setQuery] = useState('');
  const selected = releases.find((release) => release.id === selectedId) ?? releases[0];
  const orderedReleases = useMemo(() => {
    return chronologicalReleaseIds
      .map((id) => releases.find((release) => release.id === id))
      .filter(Boolean);
  }, []);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return orderedReleases;
    return orderedReleases.filter((release) => JSON.stringify(release).toLowerCase().includes(needle));
  }, [query, orderedReleases]);
  const openRelease = (id) => {
    setSelectedId(id);
    window.setTimeout(() => {
      document.getElementById('selected-release-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <main>
      <nav className="nav">
        <div>
          <strong>PEAK UNIVERSE</strong>
          <span>chronological story map</span>
        </div>
        <div className="nav-links">
          <a href="#story">Story</a>
          <a href="#chronology">Chronology</a>
          <a href="#trilogy">Trilogy</a>
          <a href="#guide">Guide</a>
          <a href="#personas">Personas</a>
          <a href="#clues">Clues</a>
          <a href="#albums">Albums</a>
          <a href="#releases">Releases</a>
        </div>
      </nav>

      <section className="hero">
        <div>
          <p className="eyebrow">current canon</p>
          <h1>I Don’t Play is released.</h1>
          <p>{story.shortVersion}</p>
          <p className="muted">{story.worldToMake}</p>
          <div className="badges">
            <Badge tone="released">PEAKSON</Badge>
            <Badge>post-release phase</Badge>
            <Badge>Reckless = draft history</Badge>
          </div>
        </div>
        <ReleaseDetail release={selected} />
      </section>

      <StoryOverview />
      <ChronologyPage />
      <TrilogyOverview />
      <VisitorPath />
      <PersonaGrid />
      <CluesPage />
      <HiddenMechanics />
      <AlbumsPage />

      <section id="releases">
        <div className="section-head split">
          <div>
            <p className="eyebrow">chronological release archive</p>
            <h2>Released and active records in story order.</h2>
            <p className="section-copy">This archive follows the same chronological spine as the story above. Open a release to see the detail panel directly below.</p>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search releases, files, roles..." />
        </div>
        <ReleaseDetail release={selected} compact />
        <div className="grid three">
          {filtered.map((release) => (
            <ReleaseCard key={release.id} release={release} active={release.id === selectedId} onSelect={openRelease} />
          ))}
        </div>
      </section>

      <Rules />
    </main>
  );
}
