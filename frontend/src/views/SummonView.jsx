import React, { useState } from "react";
import { Ghost, ArrowRight, Loader2, Sparkles, FolderGit2, CheckCircle2 } from "lucide-react";
import { analyzeRepository } from "../api/client";
import MinimalGhostBackground from "../components/MinimalGhostBackground";

export default function SummonView({ repositories, onSelectRepo, onAnalysisComplete }) {
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (targetPath) => {
    const toAnalyze = targetPath || inputVal.trim();
    if (!toAnalyze) return;

    setLoading(true);
    setError(null);
    try {
      const res = await analyzeRepository(toAnalyze);
      await onAnalysisComplete(res.repository_id);
    } catch (err) {
      setError(err.message || "Failed to analyze repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 64px)", padding: "40px 20px" }}>
      <MinimalGhostBackground />

      <div style={{ maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Simple Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", marginBottom: 12 }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "var(--accent-primary-dim)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Ghost size={24} color="var(--accent-primary)" />
            </div>
          </div>

          <h1 style={{ fontSize: "1.9rem", fontWeight: 700, color: "#fff", marginBottom: 6 }}>
            RepoSeance
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Software archaeology and codebase understanding powered by local AI.
          </p>
        </div>

        {/* Analyze Input Card */}
        <div className="card" style={{ padding: "24px 20px", marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <input
              type="text"
              className="input-field font-mono"
              placeholder="e.g. https://github.com/owner/repo or C:\path\to\repo"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              disabled={loading}
              style={{ fontSize: "0.88rem" }}
            />
            <button
              onClick={() => handleAnalyze()}
              className="btn btn-primary"
              disabled={loading || !inputVal.trim()}
              style={{ minWidth: 120 }}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="pulse-dot" /> Analyzing...
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>

          {error && (
            <div style={{
              background: "rgba(248, 113, 113, 0.1)",
              border: "1px solid rgba(248, 113, 113, 0.25)",
              color: "var(--accent-danger)",
              padding: "8px 12px",
              borderRadius: 6,
              fontSize: "0.82rem",
              marginBottom: 12
            }}>
              {error}
            </div>
          )}

          {/* Quick Presets */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: "0.8rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Quick presets:</span>
            <button
              onClick={() => {
                setInputVal(".");
                handleAnalyze(".");
              }}
              className="btn btn-ghost"
              style={{ padding: "3px 9px", fontSize: "0.76rem" }}
              disabled={loading}
            >
              <Sparkles size={11} color="var(--accent-primary)" />
              <span>Current Repo (RepoSeance)</span>
            </button>

            <button
              onClick={() => {
                setInputVal("https://github.com/Samar-365/RepoSeance.git");
                handleAnalyze("https://github.com/Samar-365/RepoSeance.git");
              }}
              className="btn btn-ghost"
              style={{ padding: "3px 9px", fontSize: "0.76rem" }}
              disabled={loading}
            >
              <span>GitHub Remote</span>
            </button>
          </div>
        </div>

        {/* Previously Analyzed Repositories */}
        {repositories && repositories.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Analyzed Repositories ({repositories.length})
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => onSelectRepo(repo.id)}
                  className="card card-interactive"
                  style={{ padding: "16px 18px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.95rem" }}>
                      {repo.name}
                    </span>
                    <span className="badge badge-blue">{repo.source_type}</span>
                  </div>

                  <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginBottom: 12, wordBreak: "break-all" }}>
                    {repo.path_or_url}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.76rem", color: "var(--text-secondary)" }}>
                    <span>{repo.total_commits} commits</span>
                    <span style={{ color: "var(--accent-primary)", fontWeight: 500 }}>Open →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
