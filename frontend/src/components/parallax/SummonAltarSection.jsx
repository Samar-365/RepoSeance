import React, { useState } from "react";
import { FolderGit2, ArrowRight, Sparkles, History, Loader2, Database, ShieldCheck, ChevronRight } from "lucide-react";
import { analyzeRepository } from "../../api/client";

export default function SummonAltarSection({ repositories, onSelectRepo, onAnalysisComplete }) {
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
    <section 
      id="altar"
      style={{
        position: "relative",
        padding: "120px 24px 160px",
        maxWidth: 1100,
        margin: "0 auto",
        zIndex: 2
      }}
    >
      {/* Act III Header */}
      <div style={{ textAlign: "center", marginBottom: 54 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.8rem",
          color: "var(--spectral-teal)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em",
          marginBottom: 12
        }}>
          <span>ACT III</span>
          <span>•</span>
          <span>THE ALTAR OF RESURRECTION</span>
        </div>

        <h2 className="font-gothic" style={{
          fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
          fontWeight: 700,
          marginBottom: 16
        }}>
          Begin Your Excavation
        </h2>

        <p style={{
          color: "var(--text-secondary)",
          maxWidth: 680,
          margin: "0 auto",
          fontSize: "1.05rem",
          lineHeight: 1.6
        }}>
          Enter the coordinates of any local Git repository or public GitHub URL. RepoSeance will index the commits, extract abandoned business, and summon the Repository Ghost.
        </p>
      </div>

      {/* Main Altar Console */}
      <div 
        className="glass-panel" 
        style={{
          padding: "36px 32px",
          borderRadius: 16,
          borderColor: "var(--border-medium)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 245, 196, 0.15)",
          marginBottom: 48
        }}
      >
        <label style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: "1rem",
          fontWeight: 600,
          color: "#ffffff",
          marginBottom: 16
        }}>
          <FolderGit2 size={20} color="var(--spectral-teal)" />
          Provide Repository Coordinates
        </label>

        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          <input
            type="text"
            className="input-field font-mono"
            placeholder="e.g. https://github.com/owner/repo or C:\path\to\local\repo"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSummon()}
            disabled={loading}
            style={{
              flex: "1 1 320px",
              padding: "14px 18px",
              fontSize: "0.95rem"
            }}
          />

          <button
            onClick={() => handleSummon()}
            className="btn btn-primary"
            disabled={loading || !inputVal.trim()}
            style={{
              padding: "14px 28px",
              fontSize: "0.95rem",
              borderRadius: 8
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="ghost-float" /> Excavating Strata...
              </>
            ) : (
              <>
                <span>Summon Repository</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>

        {error && (
          <div style={{
            background: "rgba(244, 63, 94, 0.12)",
            border: "1px solid rgba(244, 63, 94, 0.35)",
            color: "var(--blood-crimson)",
            padding: "12px 18px",
            borderRadius: 8,
            fontSize: "0.88rem",
            marginBottom: 18
          }}>
            {error}
          </div>
        )}

        {/* Quick Presets */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontSize: "0.85rem" }}>
          <span style={{ color: "var(--text-muted)" }}>Quick presets:</span>
          <button
            onClick={() => {
              setInputVal(".");
              handleSummon(".");
            }}
            className="btn btn-ghost"
            style={{ padding: "6px 14px", fontSize: "0.82rem", borderRadius: 20 }}
            disabled={loading}
          >
            <Sparkles size={13} color="var(--spectral-teal)" />
            <span>Current Workspace (RepoSeance)</span>
          </button>

          <button
            onClick={() => {
              setInputVal("https://github.com/Samar-365/RepoSeance.git");
              handleSummon("https://github.com/Samar-365/RepoSeance.git");
            }}
            className="btn btn-ghost"
            style={{ padding: "6px 14px", fontSize: "0.82rem", borderRadius: 20 }}
            disabled={loading}
          >
            <span>Remote GitHub Origin</span>
          </button>
        </div>

        {/* Privacy Note */}
        <div style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "var(--text-muted)",
          fontSize: "0.82rem"
        }}>
          <ShieldCheck size={16} color="var(--spectral-teal)" />
          <span>
            <strong>Local-First Guarantee:</strong> Ingestion and query inference execute entirely on your machine. No source code or prompts leave your environment.
          </span>
        </div>
      </div>

      {/* Previously Excavated Repositories (The Crypt) */}
      {repositories && repositories.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 className="font-gothic" style={{
              fontSize: "1.3rem",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <History size={18} color="var(--spectral-amethyst)" />
              <span>Resting in Crypt</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 400 }}>({repositories.length})</span>
            </h3>

            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Select a repository to enter its Sanctum
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {repositories.map((repo) => (
              <div
                key={repo.id}
                onClick={() => onSelectRepo(repo.id)}
                className="glass-panel glass-panel-interactive"
                style={{
                  padding: 22,
                  borderLeft: "3px solid var(--spectral-teal)",
                  borderRadius: 12
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h4 style={{ fontSize: "1.1rem", color: "#ffffff", fontWeight: 600 }}>
                    {repo.name}
                  </h4>
                  <span className="badge badge-teal">{repo.source_type}</span>
                </div>

                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: 16, wordBreak: "break-all" }}>
                  {repo.path_or_url}
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  paddingTop: 12,
                  borderTop: "1px solid var(--border-subtle)"
                }}>
                  <span>{repo.total_commits} commits indexed</span>
                  <span style={{ color: "var(--spectral-teal)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                    <span>Enter Sanctum</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
