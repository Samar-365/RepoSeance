import React, { useState, useEffect } from "react";
import { FileText, Download, Copy, Check, RefreshCw, Loader2, FileDown } from "lucide-react";
import { getReport, generateReport } from "../api/client";
import MarkdownViewer from "../components/MarkdownViewer";
import MinimalGhostBackground from "../components/MinimalGhostBackground";
import { ResurrectionReportIllustration, ReportBlueprintBannerIllustration } from "../components/ThemeIllustrations";

export default function ReportView({ repository, onInspectEvidence }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchExisting = async () => {
    setLoading(true);
    try {
      const data = await getReport(repository.id);
      if (data && data.report) {
        setReport(data.report);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExisting();
  }, [repository.id]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const data = await generateReport(repository.id);
      setReport({
        id: data.report_id,
        content_markdown: data.content_markdown,
        content_json: data.content_json,
        created_at: new Date().toISOString()
      });
    } catch (err) {
      alert("Report generation failed: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!report) return;
    navigator.clipboard.writeText(report.content_markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    if (!report) return;
    const blob = new Blob([report.content_markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${repository.name}_analysis_report.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCitationClick = (citation) => {
    if (onInspectEvidence) {
      onInspectEvidence({
        source_type: citation.type,
        source_identifier: citation.identifier,
        source_location: "Cited in Report",
        content_excerpt: `Artifact: ${citation.raw}\n\nReferenced in report for ${repository.name}.`
      });
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 64px)", padding: "28px 24px" }}>
      <MinimalGhostBackground />

      <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header with Theme Graphic */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: "1px solid var(--border-subtle)",
          flexWrap: "wrap",
          gap: 14
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <ResurrectionReportIllustration size={52} />
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                Resurrection Report
              </h1>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                Automated codebase audit, feasibility score, and revival checklist
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={handleGenerate}
              className="btn btn-primary"
              disabled={generating}
              style={{ padding: "6px 12px", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6 }}
            >
              {generating ? (
                <>
                  <Loader2 size={13} className="pulse-dot" /> Generating...
                </>
              ) : (
                <>
                  <RefreshCw size={13} /> {report ? "Regenerate" : "Generate Report"}
                </>
              )}
            </button>

            {report && (
              <>
                <button
                  onClick={handleCopy}
                  className="btn btn-ghost"
                  style={{ padding: "6px 10px", fontSize: "0.8rem" }}
                  title="Copy Markdown"
                >
                  {copied ? <Check size={13} color="var(--accent-success)" /> : <Copy size={13} />}
                </button>

                <button
                  onClick={handleDownloadMd}
                  className="btn btn-ghost"
                  style={{ padding: "6px 10px", fontSize: "0.8rem" }}
                  title="Download Markdown"
                >
                  <Download size={13} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Minimalist Resurrection Blueprint Banner */}
        <div style={{ marginBottom: 20 }}>
          <ReportBlueprintBannerIllustration isGenerated={!!report} />
        </div>

        {/* Content Area */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--accent-primary)", fontSize: "0.86rem" }}>
            <Loader2 size={24} className="pulse-dot" style={{ margin: "0 auto 8px" }} />
            <div>Checking for existing reports...</div>
          </div>
        ) : !report ? (
          <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
            <div style={{ marginBottom: 16 }}>
              <ResurrectionReportIllustration size={72} />
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginBottom: 6 }}>
              No Report Generated Yet
            </h3>
            <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)", maxWidth: 440, margin: "0 auto 20px" }}>
              Synthesize repository statistics, uncompleted TODOs, and commit trajectory into a comprehensive Markdown engineering report.
            </p>
            <button
              onClick={handleGenerate}
              className="btn btn-primary"
              disabled={generating}
              style={{ padding: "8px 18px" }}
            >
              {generating ? "Generating..." : "Generate Analysis Report"}
            </button>
          </div>
        ) : (
          <div className="card" style={{ padding: "28px 32px" }}>
            <MarkdownViewer
              content={report.content_markdown}
              onCitationClick={handleCitationClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}
