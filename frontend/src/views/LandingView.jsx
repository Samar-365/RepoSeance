import React from "react";
import { 
  ArrowRight, 
  FolderGit2, 
  ChevronRight,
  ShieldCheck,
  Cpu,
  Search
} from "lucide-react";
import MinimalGhostBackground from "../components/MinimalGhostBackground";
import { 
  HeroGhostIllustration, 
  ChatSeanceIllustration, 
  TimelineGhostIllustration, 
  ArtifactScanIllustration, 
  ResurrectionReportIllustration 
} from "../components/ThemeIllustrations";

export default function LandingView({ 
  onGoToSummon, 
  repositories = [], 
  currentRepo, 
  onSelectRepo, 
  ollamaStatus 
}) {
  const isOllamaConnected = ollamaStatus?.ollama_status === "connected";
  const modelName = ollamaStatus?.configured_model || "gemma2:2b";

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 64px)", overflow: "hidden" }}>
      <MinimalGhostBackground />

      <div style={{ 
        maxWidth: 1140, 
        margin: "0 auto", 
        padding: "48px 24px 72px", 
        position: "relative", 
        zIndex: 1 
      }}>
        {/* Minimal Hero: Two-column layout on desktop, stacked on mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          alignItems: "center",
          gap: 40,
          marginBottom: 72,
          paddingTop: 16
        }}>
          {/* Left Text Column - Ultra-minimalist text */}
          <div>
            <h1 style={{
              fontSize: "clamp(2.3rem, 4.2vw, 3.4rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: 16
            }}>
              Speak with the ghosts of your codebase.
            </h1>

            <p style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: 32,
              maxWidth: 480
            }}>
              Interrogate forgotten commits, abandoned branches, and buried markers with local AI and verified diff citations.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
              <button
                onClick={onGoToSummon}
                className="btn btn-primary"
                style={{
                  padding: "11px 22px",
                  fontSize: "0.92rem",
                  borderRadius: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 0 20px rgba(56, 189, 248, 0.2)"
                }}
              >
                <span>Analyze Repository</span>
                <ArrowRight size={15} />
              </button>

              {currentRepo && (
                <button
                  onClick={() => onSelectRepo(currentRepo.id)}
                  className="btn btn-outline"
                  style={{
                    padding: "11px 18px",
                    fontSize: "0.92rem",
                    borderRadius: 8,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8
                  }}
                >
                  <FolderGit2 size={15} />
                  <span>Open {currentRepo.name}</span>
                </button>
              )}
            </div>

            {/* Engine Specs */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: "0.76rem",
              color: "var(--text-muted)"
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <ShieldCheck size={13} color="var(--accent-success)" /> Local Only
              </span>
              <span>&bull;</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Cpu size={13} color="var(--accent-primary)" /> {isOllamaConnected ? modelName : "Offline"}
              </span>
              <span>&bull;</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <Search size={13} /> FTS5 Indexed
              </span>
            </div>
          </div>

          {/* Right Hero Theme Illustration */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
          }}>
            <HeroGhostIllustration />
          </div>
        </div>

        {/* Minimal Feature Cards with Theme-based Illustrations */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 20,
          marginBottom: 56
        }}>
          {/* Card 1 */}
          <div className="card" style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}>
            <div style={{ marginBottom: 16 }}>
              <ChatSeanceIllustration size={80} />
            </div>
            <h3 style={{ fontSize: "0.98rem", fontWeight: 600, color: "#fff", marginBottom: 6 }}>
              Grounded Chat
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              Query history with verifiable commit SHAs, dates, and diff citations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card" style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}>
            <div style={{ marginBottom: 16 }}>
              <TimelineGhostIllustration size={80} />
            </div>
            <h3 style={{ fontSize: "0.98rem", fontWeight: 600, color: "#fff", marginBottom: 6 }}>
              Ghost Timeline
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              Navigate abandoned branches, refactors, and milestone inflection points.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card" style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}>
            <div style={{ marginBottom: 16 }}>
              <ArtifactScanIllustration size={80} />
            </div>
            <h3 style={{ fontSize: "0.98rem", fontWeight: 600, color: "#fff", marginBottom: 6 }}>
              TODO Archaeology
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              Excavate orphaned TODOs, FIXMEs, and dead code markers by commit age.
            </p>
          </div>

          {/* Card 4 */}
          <div className="card" style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center"
          }}>
            <div style={{ marginBottom: 16 }}>
              <ResurrectionReportIllustration size={80} />
            </div>
            <h3 style={{ fontSize: "0.98rem", fontWeight: 600, color: "#fff", marginBottom: 6 }}>
              Revival Audit
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
              Synthesize codebase state into structured Markdown resurrection plans.
            </p>
          </div>
        </div>

        {/* Recently Analyzed Repositories (if any) */}
        {repositories && repositories.length > 0 && (
          <div style={{
            background: "rgba(15, 19, 26, 0.6)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 10,
            padding: "18px 22px",
            marginBottom: 36
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12
            }}>
              <span style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Recently Indexed Repositories
              </span>
              <button
                onClick={onGoToSummon}
                className="btn btn-ghost"
                style={{ fontSize: "0.78rem", padding: "3px 8px" }}
              >
                + New Analysis
              </button>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 10
            }}>
              {repositories.slice(0, 4).map((repo) => (
                <div
                  key={repo.id}
                  onClick={() => onSelectRepo(repo.id)}
                  style={{
                    padding: "10px 14px",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 6,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                    transition: "border-color 0.15s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-focus)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.85rem" }}>
                    {repo.name}
                  </span>
                  <ChevronRight size={13} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Minimal Footer */}
        <div style={{
          textAlign: "center",
          paddingTop: 24,
          borderTop: "1px solid var(--border-subtle)",
          color: "var(--text-muted)",
          fontSize: "0.75rem"
        }}>
          <span>RepoSeance &bull; Minimalist Local Codebase Archaeology</span>
        </div>
      </div>
    </div>
  );
}
