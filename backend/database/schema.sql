-- RepoSeance Database Schema (SQLite + FTS5)

CREATE TABLE IF NOT EXISTS repositories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    source_type TEXT NOT NULL, -- 'local' or 'remote'
    path_or_url TEXT NOT NULL UNIQUE,
    default_branch TEXT DEFAULT 'main',
    total_commits INTEGER DEFAULT 0,
    status TEXT DEFAULT 'pending', -- 'pending', 'analyzing', 'ready', 'failed'
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    analyzed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS commits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repository_id INTEGER NOT NULL,
    commit_hash TEXT NOT NULL,
    author_name TEXT,
    author_email TEXT,
    committed_at TIMESTAMP NOT NULL,
    message TEXT NOT NULL,
    files_changed_count INTEGER DEFAULT 0,
    insertions INTEGER DEFAULT 0,
    deletions INTEGER DEFAULT 0,
    is_significant BOOLEAN DEFAULT 0,
    significance_reason TEXT,
    FOREIGN KEY(repository_id) REFERENCES repositories(id) ON DELETE CASCADE,
    UNIQUE(repository_id, commit_hash)
);

CREATE TABLE IF NOT EXISTS issues_prs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repository_id INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'issue' or 'pr'
    number INTEGER NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    state TEXT NOT NULL, -- 'open', 'closed', 'merged'
    author TEXT,
    created_at TIMESTAMP,
    closed_at TIMESTAMP,
    url TEXT,
    FOREIGN KEY(repository_id) REFERENCES repositories(id) ON DELETE CASCADE,
    UNIQUE(repository_id, type, number)
);

CREATE TABLE IF NOT EXISTS unfinished_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repository_id INTEGER NOT NULL,
    category TEXT NOT NULL, -- 'todo', 'fixme', 'open_issue', 'abandoned_branch', 'dangling_doc'
    title TEXT NOT NULL,
    file_path TEXT,
    line_number INTEGER,
    snippet TEXT,
    severity TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(repository_id) REFERENCES repositories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS evidence (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repository_id INTEGER NOT NULL,
    source_type TEXT NOT NULL, -- 'commit', 'code', 'issue', 'pr'
    source_identifier TEXT NOT NULL, -- e.g. commit hash, file:line, issue #
    source_location TEXT,
    content_excerpt TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(repository_id) REFERENCES repositories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repository_id INTEGER NOT NULL,
    report_type TEXT DEFAULT 'resurrection_plan',
    content_markdown TEXT NOT NULL,
    content_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(repository_id) REFERENCES repositories(id) ON DELETE CASCADE
);

-- Full-Text Search virtual table for evidence
CREATE VIRTUAL TABLE IF NOT EXISTS evidence_fts USING fts5(
    evidence_id UNINDEXED,
    repository_id UNINDEXED,
    source_type,
    source_identifier,
    content_excerpt,
    tokenize='porter unicode61'
);

-- Indexes for fast relational queries
CREATE INDEX IF NOT EXISTS idx_commits_repo_date ON commits(repository_id, committed_at DESC);
CREATE INDEX IF NOT EXISTS idx_unfinished_repo ON unfinished_items(repository_id, category);
CREATE INDEX IF NOT EXISTS idx_evidence_repo ON evidence(repository_id);
