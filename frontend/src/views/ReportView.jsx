import React, { useState, useEffect } from "react";
import { ScrollText, Download, Copy, Check, RefreshCw, Loader2, FileDown, BookOpen } from "lucide-react";
import { getReport, generateReport } from "../api/client";

export default function ReportView({ repository }) {
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

  return (
    <div style={{ maxWidth: 1050, margin: "24px auto", padding: "0 20px" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: "1px solid var(--border-dim)",
        flexWrap: "wrap",
        gap: 16
      }}>
        <div>
          <h2 className="font-gothic" style={{ fontSize: "1.8rem", color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
            <ScrollText size={26} color="var(--spectral-amethyst)" />
            The Resurrection Scroll
          </h2>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Synthesized Software Archaeology Report & Modern Revival Plan
          </span>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={handleGenerate}
            className="btn btn-primary"
            disabled={generating}
            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
          >
            {generating ? (
              <>
                <Loader2 size={16} className="ghost-float" /> Synthesizing with Gemma...
              </>
            ) : (
              <>
                <RefreshCw size={15} /> {report ? "Regenerate Report" : "Generate Report"}
              </>
            )}
          </button>

          {report && (
            <>
              <button onClick={handleCopy} className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: "0.82rem" }}>
                {copied ? <Check size={15} color="var(--spectral-teal)" /> : <Copy size={15} />}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handleDownloadMd} className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: "0.82rem" }}>
                <FileDown size={15} /> Export Markdown
              </button>
              <button onClick={handleDownloadJson} className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: "0.82rem" }}>
                <Download size={15} /> Export JSON
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--spectral-amethyst)" }}>
          <Loader2 size={32} className="ghost-float" style={{ margin: "0 auto 12px" }} />
          <div>Retrieving scroll records...</div>
        </div>
      ) : !report ? (
        <div className="glass-panel" style={{ textAlign: "center", padding: "60px 20px" }}>
          <ScrollText size={48} color="var(--spectral-amethyst)" style={{ margin: "0 auto 16px", opacity: 0.8 }} />
          <h3 className="font-gothic" style={{ fontSize: "1.4rem", color: "#fff", marginBottom: 8 }}>
            No Resurrection Scroll Has Been Inscribed
          </h3>
          <p style={{ color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.6 }}>
            Command the local Gemma model to analyze the full repository evidence base, commit milestones, and unfinished markers to produce a comprehensive revival audit.
          </p>
          <button onClick={handleGenerate} className="btn btn-primary" disabled={generating} style={{ padding: "12px 28px" }}>
            {generating ? <Loader2 size={18} className="ghost-float" /> : <RefreshCw size={18} />}
            Inscribe Resurrection Report Now
          </button>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: 36, lineHeight: 1.8 }}>
          <pre style={{
            fontFamily: "var(--font-sans)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontSize: "0.95rem",
            color: "var(--text-primary)"
          }}>
            {report.content_markdown}
          </pre>
        </div>
      )}
    </div>
  );
}
