import React, { useState } from "react";
import { Ghost, FolderGit2, ArrowRight, ShieldCheck, History, Loader2, Database, Sparkles, CheckCircle2 } from "lucide-react";
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
    <div style={{ maxWidth: 960, margin: "36px auto", padding: "0 24px" }}>
      {/* Hero Atmosphere */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ display: "inline-flex", marginBottom: 18 }}>
          <div className="ghost-float" style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 245, 196, 0.2) 0%, transparent 70%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(0, 245, 196, 0.35)",
            boxShadow: "0 0 30px rgba(0, 245, 196, 0.15)"
          }}>
            <Ghost size={32} color="var(--spectral-teal)" className="spectral-glow" />
          </div>
        </div>

        <h1 className="font-gothic" style={{
          fontSize: "2.6rem",
          fontWeight: 700,
          background: "linear-gradient(180deg, #ffffff 40%, var(--spectral-teal) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 12
        }}>
          Resurrect Abandoned Repositories
        </h1>
        
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: 620, margin: "0 auto", lineHeight: 1.6 }}>
          Excavate Git commit strata, trace forgotten architectural intents, and interrogate surviving code relics using local Gemma AI.
        </p>
      </div>

      {/* Repository Coordinate Input Box */}
      <div className="glass-panel" style={{ padding: 28, marginBottom: 36, borderColor: "var(--border-medium)" }}>
        <label style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.95rem",
          fontWeight: 500,
          marginBottom: 12,
          color: "var(--text-primary)"
        }}>
          <FolderGit2 size={18} color="var(--spectral-teal)" />
          Provide Repository Coordinates
        </label>

        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <input
            type="text"
            className="input-field font-mono"
            placeholder="e.g. https://github.com/owner/repo or C:\path\to\repo"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSummon()}
            disabled={loading}
            style={{ fontSize: "0.88rem" }}
          />
          <button
            onClick={() => handleSummon()}
            className="btn btn-primary"
            disabled={loading || !inputVal.trim()}
            style={{ minWidth: 160 }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="ghost-float" /> Excavating...
              </>
            ) : (
              <>
                Begin Excavation <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {error && (
          <div style={{
            background: "rgba(244, 63, 94, 0.1)",
            border: "1px solid rgba(244, 63, 94, 0.3)",
            color: "var(--blood-crimson)",
            padding: "10px 14px",
            borderRadius: 8,
            fontSize: "0.85rem",
            marginBottom: 14
          }}>
            {error}
          </div>
        )}

        {/* Quick Presets */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: "0.82rem" }}>
          <span style={{ color: "var(--text-muted)" }}>Quick presets:</span>
          <button
            onClick={() => {
              setInputVal(".");
              handleSummon(".");
            }}
            className="btn btn-ghost"
            style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            disabled={loading}
          >
            <Sparkles size={12} color="var(--spectral-teal)" /> Current Repo (RepoSeance)
          </button>
          <button
            onClick={() => {
              setInputVal("https://github.com/Samar-365/RepoSeance.git");
              handleSummon("https://github.com/Samar-365/RepoSeance.git");
            }}
            className="btn btn-ghost"
            style={{ padding: "4px 10px", fontSize: "0.78rem" }}
            disabled={loading}
          >
            GitHub Origin URL
          </button>
        </div>

        {/* Privacy Assurance */}
        <div style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "var(--text-muted)",
          fontSize: "0.8rem"
        }}>
          <ShieldCheck size={16} color="var(--spectral-teal)" />
          <span>
            <strong>Local-First Guarantee:</strong> Source code and Git history are analyzed entirely on your machine. AI queries run through your local Gemma model with zero cloud data transmission.
          </span>
        </div>
      </div>

      {/* Previously Excavated Repositories */}
      {repositories && repositories.length > 0 && (
        <div>
          <h2 className="font-gothic" style={{
            fontSize: "1.2rem",
            color: "var(--text-primary)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            <History size={18} color="var(--spectral-amethyst)" /> Resting in Crypt (Analyzed Repositories)
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => onSelectRepo(repo.id)}
                className="glass-panel glass-panel-interactive"
                style={{ padding: 18, borderLeft: "3px solid var(--spectral-teal)" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <h3 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 600 }}>
                    {repo.name}
                  </h3>
                  <span className="badge badge-teal">{repo.source_type}</span>
                </div>
                
                <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 12, wordBreak: "break-all" }}>
                  {repo.path_or_url}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                  <span>{repo.total_commits} commits indexed</span>
                  <span style={{ color: "var(--spectral-teal)", fontWeight: 500 }}>Enter Sanctum →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
