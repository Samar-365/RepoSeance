import React, { useState, useRef, useEffect } from "react";
import { Skull, Send, Sparkles, GitCommit, FileCode, AlertCircle, Loader2, BookOpen, X, Copy, Check, ChevronRight } from "lucide-react";
import { seanceChat } from "../api/client";
import MarkdownViewer from "../components/MarkdownViewer";

const SUGGESTIONS = [
  "What was the original design intent of this repository?",
  "What was the last recorded commit or architectural change?",
  "What features or tasks appear unfinished or abandoned?",
  "Are there recurring bug patterns or technical debts in the record?"
];

export default function SeanceChatView({ repository, onInspectEvidence }) {
  const [messages, setMessages] = useState([
    {
      sender: "ghost",
      text: `Greetings, traveler of the code. I am the surviving memory of **${repository.name}**.\n\nInquire of what transpired within these commits, and I shall answer with strict grounding from surviving git logs and code markers.`,
      evidence: [],
      citations: [],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeRelic, setActiveRelic] = useState(null);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (questionText) => {
    const q = (questionText || input).trim();
    if (!q || loading) return;

    const userMsg = {
      sender: "user",
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const data = await seanceChat(repository.id, q);
      const ghostMsg = {
        sender: "ghost",
        text: data.response,
        model: data.model,
        simulated: data.simulated,
        evidence: data.evidence || [],
        citations: data.citations || [],
        durationMs: data.duration_ms,
        grounding: data.grounding,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, ghostMsg]);

      // If response has evidence, select the first one as active relic
      if (data.evidence && data.evidence.length > 0) {
        setActiveRelic(data.evidence[0]);
      }
    } catch (err) {
      const errorMsg = {
        sender: "ghost",
        text: `*The spiritual connection flickers...* Failed to query the séance oracle: ${err.message}`,
        evidence: [],
        citations: [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCitationClick = (citation) => {
    // Find matching evidence from the current message history or fallback to citation details
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.evidence) {
        const found = msg.evidence.find((ev) => 
          ev.source_identifier?.toLowerCase().includes(citation.identifier?.toLowerCase()) ||
          ev.content_excerpt?.toLowerCase().includes(citation.identifier?.toLowerCase())
        );
        if (found) {
          setActiveRelic(found);
          return;
        }
      }
    }

    // Default relic representation
    setActiveRelic({
      source_type: citation.type,
      source_identifier: citation.identifier,
      source_location: "Cited Repository Record",
      content_excerpt: `Referenced Artifact: ${citation.raw}\n\nThis artifact was cited by the Ghost during the séance. You can investigate its occurrence in the Stratigraphy Timeline or Unfinished Vault.`
    });
  };

  const handleCopyRelic = () => {
    if (!activeRelic) return;
    navigator.clipboard.writeText(activeRelic.content_excerpt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: 1440, margin: "20px auto", height: "calc(100vh - 100px)", display: "flex", gap: 16, padding: "0 20px" }}>
      {/* Primary Chat Chamber */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", minWidth: 0 }}>
        {/* Messages Stream */}
        <div className="glass-panel" style={{
          flex: 1,
          overflowY: "auto",
          padding: 24,
          marginBottom: 14,
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: msg.sender === "user" ? "75%" : "88%",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start"
              }}
            >
              {/* Header Label */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
                fontSize: "0.76rem",
                color: "var(--text-muted)"
              }}>
                {msg.sender === "ghost" ? (
                  <>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "rgba(0, 245, 196, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(0, 245, 196, 0.3)"
                    }}>
                      <Skull size={12} color="var(--spectral-teal)" />
                    </div>
                    <span style={{ color: "var(--spectral-teal)", fontWeight: 600 }}>Repository Ghost</span>
                    {msg.model && (
                      <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                        • {msg.model} {msg.durationMs ? `(${msg.durationMs}ms)` : ""}
                      </span>
                    )}
                  </>
                ) : (
                  <span style={{ fontWeight: 500 }}>You</span>
                )}
                <span>• {msg.time}</span>
              </div>

              {/* Message Body */}
              <div style={{
                padding: "16px 20px",
                borderRadius: 12,
                background: msg.sender === "user"
                  ? "linear-gradient(135deg, rgba(0, 245, 196, 0.15) 0%, rgba(0, 210, 255, 0.15) 100%)"
                  : "rgba(16, 21, 31, 0.8)",
                border: msg.sender === "user"
                  ? "1px solid rgba(0, 245, 196, 0.3)"
                  : "1px solid var(--border-dim)",
                boxShadow: msg.sender === "user"
                  ? "0 4px 15px rgba(0, 245, 196, 0.08)"
                  : "0 4px 20px rgba(0,0,0,0.3)",
                color: "var(--text-primary)",
                width: "100%"
              }}>
                {msg.sender === "ghost" ? (
                  <MarkdownViewer 
                    content={msg.text} 
                    onCitationClick={handleCitationClick} 
                  />
                ) : (
                  <div style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                    {msg.text}
                  </div>
                )}

                {/* Evidence Artifacts Carousel / List */}
                {msg.evidence && msg.evidence.length > 0 && (
                  <div style={{
                    marginTop: 16,
                    paddingTop: 12,
                    borderTop: "1px solid var(--border-subtle)"
                  }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      <BookOpen size={13} color="var(--spectral-teal)" />
                      <span>Retrieved Evidence Relics ({msg.evidence.length})</span>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {msg.evidence.map((ev, evIdx) => (
                        <button
                          key={evIdx}
                          onClick={() => setActiveRelic(ev)}
                          className="btn btn-ghost"
                          style={{
                            padding: "4px 10px",
                            fontSize: "0.75rem",
                            borderRadius: 6,
                            background: activeRelic === ev ? "rgba(0, 245, 196, 0.15)" : "rgba(255, 255, 255, 0.03)",
                            borderColor: activeRelic === ev ? "var(--spectral-teal)" : "var(--border-subtle)"
                          }}
                        >
                          <span className="font-mono" style={{ color: "var(--spectral-teal)" }}>
                            {ev.source_identifier}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, color: "var(--spectral-teal)" }}>
              <Loader2 size={18} className="ghost-float" />
              <span style={{ fontSize: "0.85rem", fontStyle: "italic" }}>
                Consulting the surviving commit strata with local Gemma AI...
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 8 }}>
          {SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              className="btn btn-ghost"
              disabled={loading}
              style={{
                fontSize: "0.76rem",
                padding: "4px 10px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.02)",
                whiteSpace: "nowrap"
              }}
            >
              <Sparkles size={11} color="var(--spectral-teal)" />
              <span>{sug}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            className="input-field"
            placeholder="Ask the Repository Ghost about past decisions, bugs, or intentions..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
            style={{ padding: "12px 18px", fontSize: "0.92rem" }}
          />
          <button
            onClick={() => handleSend()}
            className="btn btn-primary"
            disabled={loading || !input.trim()}
            style={{ padding: "0 22px" }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Relic Codex / Live Evidence Inspector Drawer (Collapsible / Dynamic) */}
      {activeRelic && (
        <div className="glass-panel" style={{
          width: 380,
          display: "flex",
          flexDirection: "column",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid var(--border-medium)"
        }}>
          {/* Drawer Header */}
          <div style={{
            padding: "14px 18px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0, 0, 0, 0.25)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BookOpen size={16} color="var(--spectral-teal)" />
              <span className="font-gothic" style={{ fontSize: "0.95rem", color: "#ffffff" }}>
                Relic Codex
              </span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button
                onClick={handleCopyRelic}
                className="btn btn-ghost"
                style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                title="Copy relic content"
              >
                {copied ? <Check size={13} color="var(--spectral-teal)" /> : <Copy size={13} />}
              </button>
              <button
                onClick={() => setActiveRelic(null)}
                className="btn btn-ghost"
                style={{ padding: "4px 8px" }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div style={{ padding: 18, overflowY: "auto", flex: 1 }}>
            <div style={{ marginBottom: 12 }}>
              <span className="badge badge-teal" style={{ marginBottom: 6 }}>
                {activeRelic.source_type?.toUpperCase() || "RELIC"}
              </span>
              <div className="font-mono" style={{ fontSize: "0.82rem", color: "#ffffff", fontWeight: 600, wordBreak: "break-all" }}>
                {activeRelic.source_identifier}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 2 }}>
                Location: {activeRelic.source_location || "Repository index"}
              </div>
            </div>

            <pre className="font-mono" style={{
              background: "#080a10",
              padding: 14,
              borderRadius: 8,
              border: "1px solid var(--border-subtle)",
              fontSize: "0.78rem",
              lineHeight: 1.55,
              color: "#cbd5e1",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word"
            }}>
              {activeRelic.content_excerpt}
            </pre>
          </div>

          {/* Modal Popout Action */}
          <div style={{ padding: "12px 18px", borderTop: "1px solid var(--border-subtle)", background: "rgba(0,0,0,0.2)" }}>
            <button
              onClick={() => onInspectEvidence(activeRelic)}
              className="btn btn-ghost"
              style={{ width: "100%", fontSize: "0.78rem" }}
            >
              Expand into Full Inspection Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
