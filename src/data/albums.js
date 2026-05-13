export const albums = [
  {
    id: 'peakson-i-dont-play',
    artist: 'PEAKSON',
    title: 'I DON’T PLAY',
    totalTracks: 10,
    story: 'A controlled public figure builds a perfect mask of dominance, then discovers that refusing the game still makes him part of it.',
    connection: 'This album is the mask. kaospen investigates it, and KAPONES exposes what the body remembers underneath it.',
    tone: 'cold, controlled, status-driven, minimal, dangerous',
    tracks: [
      { n: 1, title: 'The Peak', status: 'Released', role: 'The mask is introduced: height, silence, dominance, pressure.' },
      { n: 2, title: 'I Don’t Play', status: 'Released', role: 'The public refusal: PEAKSON claims he is outside the game.' },
      { n: 3, title: 'Still Above the Room', status: 'Unwritten', role: 'He watches everyone react while pretending he is untouched.' },
      { n: 4, title: 'No Witness', status: 'Unwritten', role: 'He removes evidence, names, and emotional fingerprints.' },
      { n: 5, title: 'Pressure Suit', status: 'Unwritten', role: 'The image becomes armor, but the armor starts tightening.' },
      { n: 6, title: 'Crown Noise', status: 'Unwritten', role: 'Status becomes louder than truth. The crown begins to distort the room.' },
      { n: 7, title: 'The Game Moves Without Me', status: 'Unwritten', role: 'He realizes distance is still participation.' },
      { n: 8, title: 'Clean Hands', status: 'Unwritten', role: 'He insists he is innocent while every clue points back to control.' },
      { n: 9, title: 'Thin Air', status: 'Unwritten', role: 'At the top, isolation turns into suffocation.' },
      { n: 10, title: 'I Was the Room', status: 'Unwritten', role: 'Final reveal: he was not outside the scene; he shaped the entire room.' },
    ],
  },
  {
    id: 'kaospen-under-cover',
    artist: 'kaospen',
    title: 'under.COVER.',
    totalTracks: 10,
    story: 'A system witness follows the evidence from mirror to skin to light to cover story, then realizes the investigation is also about himself.',
    connection: 'This album is the evidence file. It explains how PEAKSON’s clean mask was built and why KAPONES keeps returning as body memory.',
    tone: 'coded, nocturnal, tense, analytical, haunted',
    tracks: [
      { n: 1, title: 'MIRROR MOUTH', status: 'Released', role: 'The mirror speaks first and starts the investigation.' },
      { n: 2, title: 'under my skin', status: 'Released', role: 'Fear and desire enter the system as an infection.' },
      { n: 3, title: 'LOW LIGHT', status: 'Released', role: 'Control becomes stylish enough to hide damage.' },
      { n: 4, title: 'sunrise is a liar', status: 'Released', role: 'Daylight becomes evidence instead of healing.' },
      { n: 5, title: 'under.COVER.', status: 'Released', role: 'The cover story is exposed as the clue.' },
      { n: 6, title: 'case file: no crown', status: 'Unwritten', role: 'kaospen strips status language away from PEAKSON’s mask.' },
      { n: 7, title: 'error log romance', status: 'Unwritten', role: 'Emotion appears as corrupted system data.' },
      { n: 8, title: 'the witness lied too', status: 'Unwritten', role: 'The investigator becomes unreliable.' },
      { n: 9, title: 'archive of the body', status: 'Unwritten', role: 'kaospen finds evidence that points toward KAPONES.' },
      { n: 10, title: 'system exit', status: 'Unwritten', role: 'The system cannot solve the story because it is part of the story.' },
    ],
  },
  {
    id: 'kapones-room-tilt',
    artist: 'KAPONES',
    title: 'ROOM TILT',
    totalTracks: 10,
    story: 'A body-status figure enters through rhythm, nightlife, money, and heat, then proves that what was suppressed by control never disappeared.',
    connection: 'This album is the body. It turns PEAKSON’s control and kaospen’s evidence into movement, temptation, and physical consequence.',
    tone: 'live-band, rhythmic, sensual, bossed-up, physical, volatile',
    tracks: [
      { n: 1, title: 'Can’t Shake Me Off', status: 'Planned', role: 'KAPONES enters as body memory that refuses to disappear.' },
      { n: 2, title: 'Room Tilt', status: 'Unwritten', role: 'The room changes before he explains himself.' },
      { n: 3, title: 'Velvet Convex', status: 'Unwritten', role: 'The Flame becomes a surface that bends every reflection.' },
      { n: 4, title: 'Boss Language', status: 'Unwritten', role: 'Money and status become rhythm instead of argument.' },
      { n: 5, title: 'Heat Ledger', status: 'Unwritten', role: 'Desire is counted like debt.' },
      { n: 6, title: 'No Static in the Body', status: 'Unwritten', role: 'Movement becomes more honest than thought.' },
      { n: 7, title: 'After the Club Closes', status: 'Unwritten', role: 'The party ends, but the residue stays.' },
      { n: 8, title: 'Gold Teeth Witness', status: 'Unwritten', role: 'Status becomes testimony.' },
      { n: 9, title: 'What the System Missed', status: 'Unwritten', role: 'KAPONES reveals what kaospen could document but not feel.' },
      { n: 10, title: 'Body Never Deleted', status: 'Unwritten', role: 'Final reveal: suppression was only storage.' },
    ],
  },
];

export function getAlbumStats(album) {
  const released = album.tracks.filter((track) => track.status === 'Released').length;
  const planned = album.tracks.filter((track) => track.status === 'Planned').length;
  const complete = album.tracks.filter((track) => track.status === 'Released' || track.status === 'Planned').length;
  const remainingToRelease = album.totalTracks - released;
  const remainingToWrite = album.tracks.filter((track) => track.status === 'Unwritten').length;
  const percentReleased = Math.round((released / album.totalTracks) * 100);
  const percentMapped = Math.round((complete / album.totalTracks) * 100);
  return { released, planned, complete, remainingToRelease, remainingToWrite, percentReleased, percentMapped };
}
