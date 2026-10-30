import React, { useState, useEffect } from "react";
import { ScrollText, Download, Copy, Check, RefreshCw, Loader2, FileDown, BookOpen, Sparkles } from "lucide-react";
import { getReport, generateReport } from "../api/client";
import MarkdownViewer from "../components/MarkdownViewer";

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
    link.download = `${repository.name}_resurrection_report.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    if (!report) return;
    const jsonStr = JSON.stringify(report.content_json || report, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${repository.name}_resurrection_data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCitationClick = (citation) => {
    if (onInspectEvidence) {
      onInspectEvidence({
        source_type: citation.type,
        source_identifier: citation.identifier,
        source_location: "Cited in Resurrection Report",
        content_excerpt: `Artifact: ${citation.raw}\n\nReferenced in Resurrection Scroll for ${repository.name}. Check Stratigraphy Timeline or Unfinished Vault to inspect full occurrence.`
      });
    }
  };

  return (
    <div style={{ maxWidth: 1080, margin: "24px auto", padding: "0 24px" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
        paddingBottom: 16,
        borderBottom: "1px solid var(--border-subtle)",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div>
          <h1 className="font-gothic" style={{ fontSize: "1.9rem", color: "#ffffff", display: "flex", alignItems: "center", gap: 10 }}>
            <ScrollText size={24} color="var(--spectral-amethyst)" />
            The Resurrection Scroll
          </h1>
          <span style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Synthesized Software Archaeology Audit & Modern Revival Blueprint
          </span>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={handleGenerate}
            className="btn btn-primary"
            disabled={generating}
            style={{ padding: "8px 16px", fontSize: "0.84rem" }}
          >
            {generating ? (
              <>
                <Loader2 size={15} className="ghost-float" /> Synthesizing with Gemma...
              </>
            ) : (
              <>
                <RefreshCw size={14} /> {report ? "Regenerate Scroll" : "Synthesize Scroll"}
              </>
            )}
          </button>

          {report && (
            <>
              <button onClick={handleCopy} className="btn btn-ghost" style={{ padding: "8px 12px", fontSize: "0.82rem" }}>
                {copied ? <Check size={14} color="var(--spectral-teal)" /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button onClick={handleDownloadMd} className="btn btn-ghost" style={{ padding: "8px 12px", fontSize: "0.82rem" }}>
                <FileDown size={14} /> Markdown (.md)
              </button>
              <button onClick={handleDownloadJson} className="btn btn-ghost" style={{ padding: "8px 12px", fontSize: "0.82rem" }}>
                <Download size={14} /> JSON (.json)
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--spectral-amethyst)" }}>
          <Loader2 size={32} className="ghost-float" style={{ margin: "0 auto 12px" }} />
          <div>Retrieving scroll records from database...</div>
        </div>
      ) : !report ? (
        <div className="glass-panel" style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(168, 85, 247, 0.12)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px"
          }}>
            <ScrollText size={28} color="var(--spectral-amethyst)" />
          </div>

          <h2 className="font-gothic" style={{ fontSize: "1.4rem", color: "#ffffff", marginBottom: 8 }}>
            No Resurrection Scroll Has Been Inscribed Yet
          </h2>

          <p style={{ color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.6, fontSize: "0.92rem" }}>
            Command the local Gemma model to analyze the full repository evidence base, commit milestones, and unfinished markers to produce a comprehensive revival audit.
          </p>

          <button onClick={handleGenerate} className="btn btn-primary" disabled={generating} style={{ padding: "10px 24px" }}>
            {generating ? <Loader2 size={16} className="ghost-float" /> : <Sparkles size={16} />}
            Inscribe Resurrection Report Now
          </button>
        </div>
      ) : (
        <div className="glass-panel" style={{
          padding: 36,
          background: "linear-gradient(180deg, rgba(16, 21, 31, 0.85) 0%, rgba(12, 16, 24, 0.95) 100%)",
          border: "1px solid var(--border-medium)"
        }}>
          <MarkdownViewer 
            content={report.content_markdown} 
            onCitationClick={handleCitationClick} 
          />
        </div>
      )}
    </div>
  );
}
