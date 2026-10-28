import React, { useState, useRef, useEffect } from "react";
import { Skull, Send, Sparkles, BookOpen, GitCommit, FileCode, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { seanceChat } from "../api/client";

const SUGGESTIONS = [
  "What was the original purpose and intent of this repository?",
  "What was the last major change or commit made to this codebase?",
  "What features or tasks appear unfinished in this project?",
  "Are there recurring bugs or technical debts visible in the commit record?"
];

export default function SeanceChatView({ repository, onInspectEvidence }) {
  const [messages, setMessages] = useState([
    {
      sender: "ghost",
      text: `Greetings, traveler of the code. I am the surviving memory of ${repository.name}. Inquire of what transpired within these commits, and I shall answer from the surviving evidence preserved in the git logs.`,
      evidence: [],
      citations: [],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <div style={{ maxWidth: 1100, margin: "20px auto", height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      {/* Chat Messages Chamber */}
      <div className="glass-panel" style={{
        flex: 1,
        overflowY: "auto",
        padding: 24,
        marginBottom: 16,
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
              maxWidth: "85%",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start"
            }}
          >
            {/* Avatar & Label */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
              fontSize: "0.78rem",
              color: "var(--text-muted)"
            }}>
              {msg.sender === "ghost" ? (
                <>
                  <Skull size={15} color="var(--spectral-teal)" />
                  <span style={{ color: "var(--spectral-teal)", fontWeight: 600 }}>Repository Ghost</span>
                  {msg.model && <span className="badge badge-teal" style={{ padding: "1px 6px", fontSize: "0.68rem" }}>{msg.model}</span>}
                  {msg.durationMs && <span>({msg.durationMs}ms)</span>}
                </>
              ) : (
                <span>Living Inquirer • {msg.time}</span>
              )}
            </div>

            {/* Bubble */}
            <div style={{
              padding: "16px 20px",
              borderRadius: 12,
              background: msg.sender === "user"
                ? "linear-gradient(135deg, rgba(0, 245, 196, 0.15) 0%, rgba(0, 180, 219, 0.15) 100%)"
                : "rgba(18, 22, 32, 0.85)",
              border: `1px solid ${msg.sender === "user" ? "rgba(0, 245, 196, 0.3)" : "var(--border-dim)"}`,
              color: msg.sender === "user" ? "#ffffff" : "var(--text-primary)",
              lineHeight: 1.6,
              fontSize: "0.95rem",
              whiteSpace: "pre-wrap",
              boxShadow: msg.sender === "ghost" ? "0 4px 20px rgba(0,0,0,0.3)" : "none"
            }}>
              {msg.text}
            </div>

            {/* Evidence Cards for Ghost Responses */}
            {msg.evidence && msg.evidence.length > 0 && (
              <div style={{ marginTop: 12, width: "100%" }}>
                <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <BookOpen size={12} color="var(--spectral-teal)" />
                  Verifiable Evidence Grounding ({msg.evidence.length} sources):
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {msg.evidence.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => onInspectEvidence(ev)}
                      className="btn btn-ghost"
                      style={{
                        padding: "5px 10px",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        borderRadius: 6,
                        borderColor: "rgba(0, 245, 196, 0.25)",
                        background: "rgba(0, 245, 196, 0.05)",
                        color: "var(--spectral-teal)"
                      }}
                      title="Inspect evidence excerpt"
                    >
                      <GitCommit size={13} />
                      <span>{ev.source_type?.toUpperCase()} {ev.source_identifier?.slice(0, 8)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--spectral-teal)", padding: "10px 0" }}>
            <Loader2 size={18} className="ghost-float" />
            <span style={{ fontSize: "0.88rem", fontStyle: "italic" }}>
              The Repository Ghost communes with local Gemma oracle...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Inquiries (if conversation just started) */}
      {messages.length <= 2 && (
        <div style={{ marginBottom: 12, display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="btn btn-ghost"
              style={{
                fontSize: "0.78rem",
                padding: "6px 14px",
                borderRadius: 20,
                whiteSpace: "nowrap",
                borderStyle: "dashed"
              }}
              disabled={loading}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Bar */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="text"
          className="input-field"
          placeholder="Ask the Repository Ghost anything about commits, architecture, or abandoned features..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          onClick={() => handleSend()}
          className="btn btn-primary"
          disabled={loading || !input.trim()}
          style={{ minWidth: 120 }}
        >
          <Send size={16} /> Inquire
        </button>
      </div>
    </div>
  );
}
