export const taskStatuses = {
  completed: 'Completed',
  partial: 'Partial',
  incomplete: 'Incomplete',
  locked: 'Locked',
  triage: 'Triage',
};

export const projectTasks = [
  {
    id: 'cloudflare-live-url',
    lane: 'Deployment',
    status: 'completed',
    requested: 'Use the Cloudflare Pages URL as the current live site.',
    done: 'README and agent docs point to https://speakon.pages.dev/.',
    next: 'Keep old GitHub Pages URLs out of public docs.',
  },
  {
    id: 'main-default-branch',
    lane: 'Repository',
    status: 'completed',
    requested: 'Main should be the default branch always.',
    done: 'Repository default branch is main; README and AGENTS.md document the rule.',
    next: 'All future writes target main unless using a temporary feature branch.',
  },
  {
    id: 'global-agent-standard',
    lane: 'Workflow',
    status: 'completed',
    requested: 'Put an OpenAI agent on project quality and make it global.',
    done: 'AGENTS.md defines Agent on it, DBC, source checks, code-quality rules, and locked rules.',
    next: 'Use this standard before marking future work complete.',
  },
  {
    id: 'dbc-global-enhancer',
    lane: 'Canon',
    status: 'completed',
    requested: 'DBC means Don’t Be Cringe and should enhance the whole project.',
    done: 'DBC is documented as a global quality rule: surface first, lore second.',
    next: 'Apply DBC to lyrics, pages, investor copy, and UI.',
  },
  {
    id: 'released-canon-locked',
    lane: 'Canon',
    status: 'locked',
    requested: 'Mark released creative canon as locked.',
    done: 'Released canon is locked unless correcting metadata.',
    next: 'Do not rewrite released tracks from repo tasks.',
  },
  {
    id: 'upload-management',
    lane: 'Product',
    status: 'locked',
    requested: 'Do not work on upload/audio management until the main site is ready.',
    done: 'Upload/audio work is blocked in agent rules.',
    next: 'Reopen only after investor site, docs, and tests are stable.',
  },
  {
    id: 'investor-page',
    lane: 'Web',
    status: 'incomplete',
    requested: 'Create a maximal-quality investor webpage.',
    done: 'Core story/source files exist; investor framing is documented in AGENTS.md.',
    next: 'Build a dedicated investor page from shared data, with thesis, proof, roadmap, and CTA.',
  },
  {
    id: 'tests',
    lane: 'Engineering',
    status: 'incomplete',
    requested: 'All code should be tested.',
    done: 'Build script exists.',
    next: 'Add schema tests, smoke tests, and CI-quality checks.',
  },
  {
    id: 'docs-upgrade',
    lane: 'Documentation',
    status: 'partial',
    requested: 'Documentation should stay updated.',
    done: 'README has live URL and main-branch rule; AGENTS.md is upgraded.',
    next: 'Expand README with setup, scripts, deployment, and data-source rules.',
  },
  {
    id: 'release-source-conflicts',
    lane: 'Data',
    status: 'triage',
    requested: 'Keep project-wide status accurate.',
    done: 'Task ledger tracks conflicts as triage instead of silently treating them as complete.',
    next: 'Reconcile any release/persona conflicts from source files before investor-facing publication.',
  },
];

export function getProjectTaskStats(tasks = projectTasks) {
  return tasks.reduce(
    (stats, task) => ({
      ...stats,
      [task.status]: (stats[task.status] ?? 0) + 1,
      total: stats.total + 1,
    }),
    { total: 0 },
  );
}
