import React, { useState } from "react";
import { Ghost, Sparkles, FolderGit2, ArrowRight, ShieldCheck, History, Loader2, GitBranch } from "lucide-react";
import { analyzeRepository } from "../api/client";

export default function SummonView({ repositories, onSelectRepo, onAnalysisComplete }) {
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummon = async (targetPath) => {
    const toAnalyze = targetPath || inputVal.trim();
    if (!toAnalyze) return;

    setLoading(true);
    setError(null);
    try {
      const res = await analyzeRepository(toAnalyze);
      await onAnalysisComplete(res.repository_id);
    } catch (err) {
      setError(err.message || "Failed to summon repository");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 20px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "inline-block", marginBottom: 16 }}>
          <div className="ghost-float" style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 245, 196, 0.2) 0%, transparent 70%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            border: "1px solid rgba(0, 245, 196, 0.3)"
          }}>
            <Ghost size={36} color="var(--spectral-teal)" className="spectral-glow" />
          </div>
        </div>

        <h1 className="font-gothic" style={{
          fontSize: "2.8rem",
          fontWeight: 900,
          background: "linear-gradient(180deg, #ffffff 30%, var(--spectral-teal) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 12
        }}>
          SUMMON THE DEAD CODE
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
          Resurrect the lost context of abandoned, archived, or unfamiliar software repositories.
          Ground every answer in surviving commits, pull requests, and code markers using local Gemma AI.
        </p>
      </div>

      {/* Summoning Input Card */}
      <div className="glass-panel" style={{ padding: 32, marginBottom: 40, borderColor: "var(--border-bright)" }}>
        <h2 style={{ fontSize: "1.15rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <FolderGit2 size={20} color="var(--spectral-teal)" />
          Provide Repository Coordinates
        </h2>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <input
            type="text"
            className="input-field font-mono"
            placeholder="e.g. https://github.com/owner/repo or C:\path\to\local\repo"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSummon()}
            disabled={loading}
          />
          <button
            onClick={() => handleSummon()}
            className="btn btn-primary"
            disabled={loading || !inputVal.trim()}
            style={{ minWidth: 160, padding: "12px 24px" }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="ghost-float" /> Summoning...
              </>
            ) : (
              <>
                Begin Séance <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>

        {error && (
          <div style={{
            background: "rgba(255, 71, 102, 0.1)",
            border: "1px solid rgba(255, 71, 102, 0.3)",
            color: "var(--blood-crimson)",
            padding: "10px 16px",
            borderRadius: 8,
            fontSize: "0.88rem",
            marginBottom: 16
          }}>
            {error}
          </div>
        )}

        {/* Quick Presets */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontSize: "0.85rem" }}>
          <span style={{ color: "var(--text-muted)" }}>Quick summon:</span>
          <button
            onClick={() => {
              setInputVal(".");
              handleSummon(".");
            }}
            className="btn btn-ghost"
            style={{ padding: "4px 12px", fontSize: "0.8rem", borderRadius: 20 }}
            disabled={loading}
          >
            ✨ Current Repo (RepoSeance)
          </button>
          <button
            onClick={() => setInputVal("https://github.com/Samar-365/RepoSeance.git")}
            className="btn btn-ghost"
            style={{ padding: "4px 12px", fontSize: "0.8rem", borderRadius: 20 }}
            disabled={loading}
          >
            🌐 RepoSeance Remote GitHub
          </button>
        </div>

        {/* Privacy Note */}
        <div style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: "1px solid var(--border-dim)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "var(--text-muted)",
          fontSize: "0.82rem"
        }}>
          <ShieldCheck size={16} color="var(--spectral-teal)" />
          <span>
            <strong>Local-First Privacy:</strong> Repository source code and Git history are analyzed locally and queried through your local Gemma model. No private code is transmitted to external inference clouds.
          </span>
        </div>
      </div>

      {/* Previously Summoned Repositories */}
      {repositories && repositories.length > 0 && (
        <div>
          <h3 className="font-gothic" style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <History size={18} /> Resting in Crypt (Previously Analyzed)
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => onSelectRepo(repo.id)}
                className="glass-panel glass-panel-interactive"
                style={{ padding: 20, cursor: "pointer" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h4 style={{ fontSize: "1.05rem", color: "var(--text-primary)" }}>{repo.name}</h4>
                  <span className="badge badge-teal">{repo.source_type}</span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: 12, wordBreak: "break-all" }}>
                  {repo.path_or_url}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <span>{repo.total_commits} commits indexed</span>
                  <span style={{ color: "var(--spectral-teal)" }}>Enter Sanctum →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
