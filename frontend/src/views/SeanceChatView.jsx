import React, { useState, useRef, useEffect } from "react";
import { Ghost, Send, Loader2, BookOpen, X, Copy, Check, Sparkles, Terminal } from "lucide-react";
import { seanceChat } from "../api/client";
import MarkdownViewer from "../components/MarkdownViewer";
import MinimalGhostBackground from "../components/MinimalGhostBackground";
import { SmallGhostOracle } from "../components/ThemeIllustrations";

const SUGGESTIONS = [
  "What is the main purpose of this repository?",
  "What was the last major change?",
  "What tasks or features appear unfinished?",
  "Are there recurring bugs or technical debts?"
];

export default function SeanceChatView({ repository, onInspectEvidence }) {
  const [messages, setMessages] = useState([
    {
      sender: "ghost",
      text: `Hello. I have indexed the commit history and files for **${repository.name}**. Ask me any question about the architecture, past decisions, or unfinished tasks.`,
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
        evidence: data.evidence || [],
        citations: data.citations || [],
        durationMs: data.duration_ms,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, ghostMsg]);

      if (data.evidence && data.evidence.length > 0) {
        setActiveRelic(data.evidence[0]);
      }
    } catch (err) {
      const errorMsg = {
        sender: "ghost",
        text: `Error querying model: ${err.message}`,
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

    setActiveRelic({
      source_type: citation.type,
      source_identifier: citation.identifier,
      source_location: "Cited Record",
      content_excerpt: `Referenced artifact: ${citation.raw}`
    });
  };

  const handleCopyRelic = () => {
    if (!activeRelic) return;
    navigator.clipboard.writeText(activeRelic.content_excerpt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative", height: "calc(100vh - 64px)", padding: "16px 20px", display: "flex", gap: 14 }}>
      <MinimalGhostBackground />

      {/* Main Chat Stream */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", minWidth: 0, position: "relative", zIndex: 1 }}>
        <div className="card" style={{
          flex: 1,
          overflowY: "auto",
          padding: 20,
          marginBottom: 12,
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: msg.sender === "user" ? "80%" : "88%",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start"
              }}
            >
              {/* Header Label */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 5,
                fontSize: "0.75rem",
                color: "var(--text-muted)"
              }}>
                {msg.sender === "ghost" ? (
                  <>
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background: "var(--accent-primary-dim)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Ghost size={11} color="var(--accent-primary)" />
                    </div>
                    <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Assistant</span>
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

              {/* Message Box */}
              <div style={{
                padding: "12px 16px",
                borderRadius: 8,
                background: msg.sender === "user" ? "var(--accent-primary-dim)" : "var(--bg-card)",
                border: msg.sender === "user" ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                width: "100%"
              }}>
                {msg.sender === "ghost" ? (
                  <MarkdownViewer 
                    content={msg.text} 
                    onCitationClick={handleCitationClick} 
                  />
                ) : (
                  <div style={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {msg.text}
                  </div>
                )}

                {/* Evidence Artifacts Bar */}
                {msg.evidence && msg.evidence.length > 0 && (
                  <div style={{
                    marginTop: 12,
                    paddingTop: 10,
                    borderTop: "1px solid var(--border-subtle)"
                  }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 }}>
                      <BookOpen size={12} color="var(--accent-primary)" />
                      <span>Retrieved Evidence ({msg.evidence.length})</span>
                    </div>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {msg.evidence.map((ev, evIdx) => (
                        <button
                          key={evIdx}
                          onClick={() => setActiveRelic(ev)}
                          className="btn btn-ghost"
                          style={{
                            padding: "3px 8px",
                            fontSize: "0.74rem",
                            borderRadius: 4,
                            background: activeRelic === ev ? "var(--accent-primary-dim)" : "transparent",
                            borderColor: activeRelic === ev ? "var(--accent-primary)" : "var(--border-subtle)"
                          }}
                        >
                          <span className="font-mono" style={{ color: "var(--accent-primary)" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, color: "var(--accent-primary)", fontSize: "0.84rem" }}>
              <Loader2 size={15} className="pulse-dot" />
              <span>Searching repository evidence with local AI...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Pills */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 6, marginBottom: 8 }}>
          {SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              className="btn btn-ghost"
              disabled={loading}
              style={{
                fontSize: "0.75rem",
                padding: "3px 9px",
                borderRadius: 14,
                whiteSpace: "nowrap"
              }}
            >
              <span>{sug}</span>
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            className="input-field"
            placeholder="Ask a question about the repository..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button
            onClick={() => handleSend()}
            className="btn btn-primary"
            disabled={loading || !input.trim()}
            style={{ padding: "0 18px" }}
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* Right-Side Panel: Either Evidence Inspector OR Assistant Mascot Widget */}
      {activeRelic ? (
        <div className="card" style={{
          width: 320,
          display: "flex",
          flexDirection: "column",
          borderRadius: 8,
          overflow: "hidden",
          position: "relative",
          zIndex: 1
        }}>
          {/* Drawer Header */}
          <div style={{
            padding: "12px 16px",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0, 0, 0, 0.2)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <BookOpen size={14} color="var(--accent-primary)" />
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
                Evidence Record
              </span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={handleCopyRelic}
                className="btn btn-ghost"
                style={{ padding: "3px 6px", fontSize: "0.72rem" }}
                title="Copy snippet"
              >
                {copied ? <Check size={12} color="var(--accent-success)" /> : <Copy size={12} />}
              </button>
              <button
                onClick={() => setActiveRelic(null)}
                className="btn btn-ghost"
                style={{ padding: "3px 6px" }}
                title="Close"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Drawer Content */}
          <div style={{ padding: 16, overflowY: "auto", flex: 1 }}>
            <div style={{ marginBottom: 10 }}>
              <span className="badge badge-blue" style={{ marginBottom: 4 }}>
                {activeRelic.source_type?.toUpperCase()}
              </span>
              <div className="font-mono" style={{ fontSize: "0.8rem", color: "#fff", fontWeight: 600, wordBreak: "break-all" }}>
                {activeRelic.source_identifier}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: 2 }}>
                {activeRelic.source_location}
              </div>
            </div>

            <pre className="font-mono" style={{
              background: "#06080c",
              padding: 12,
              borderRadius: 6,
              border: "1px solid var(--border-subtle)",
              fontSize: "0.76rem",
              lineHeight: 1.5,
              color: "#cbd5e1",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word"
            }}>
              {activeRelic.content_excerpt}
            </pre>
          </div>

          <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border-subtle)" }}>
            <button
              onClick={() => onInspectEvidence(activeRelic)}
              className="btn btn-ghost"
              style={{ width: "100%", fontSize: "0.76rem" }}
            >
              Expand Full Modal
            </button>
          </div>
        </div>
      ) : (
        /* Small Side Mascot Card placed at the right side */
        <div className="card" style={{
          width: 260,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "20px 16px",
          borderRadius: 8,
          position: "relative",
          zIndex: 1,
          justifyContent: "space-between"
        }}>
          <div>
            {/* Small Ghost Mascot */}
            <div style={{ marginBottom: 12 }}>
              <SmallGhostOracle size={76} />
            </div>

            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff", marginBottom: 4 }}>
              Codebase Assistant
            </h3>
            
            <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.45, margin: "0 0 14px" }}>
              Grounded answers with exact commit SHAs and line diffs.
            </p>

            <div style={{
              padding: "6px 10px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 6,
              fontSize: "0.74rem",
              color: "var(--text-muted)",
              marginBottom: 14,
              textAlign: "left"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Terminal size={12} color="var(--accent-primary)" />
                <span style={{ color: "#fff", fontWeight: 500 }}>{repository.name}</span>
              </div>
              <div>Commits: <span style={{ color: "var(--text-primary)" }}>{repository.total_commits || 0}</span></div>
            </div>
          </div>

          <div style={{ width: "100%", borderTop: "1px solid var(--border-subtle)", paddingTop: 12 }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Select any citation in chat to inspect evidence.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
