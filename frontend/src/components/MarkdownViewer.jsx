import React from "react";
import { GitCommit, FileCode, AlertCircle } from "lucide-react";

/**
 * Parses inline citations like [Commit 9faf6b13], [File path/to/file.py:42], [Issue #12]
 * and converts them into clickable interactive evidence chips.
 */
function renderInlineWithCitations(text, onCitationClick) {
  if (!text) return null;

  // Regex matching [Commit <hash>], [File <path>], [Issue #<num>], [PR #<num>]
  const citationRegex = /\[(Commit|File|Issue|PR)\s+([^\]]+)\]/g;
  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = citationRegex.exec(text)) !== null) {
    // Text before citation
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const type = match[1].toLowerCase();
    const identifier = match[2];
    const fullMatch = match[0];

    const getIcon = () => {
      switch (type) {
        case "commit": return <GitCommit size={13} />;
        case "file": return <FileCode size={13} />;
        default: return <AlertCircle size={13} />;
      }
    };

    elements.push(
      <span
        key={match.index}
        className="evidence-chip"
        onClick={() => {
          if (onCitationClick) {
            onCitationClick({
              type,
              identifier,
              raw: fullMatch
            });
          }
        }}
        title={`Inspect ${type} artifact: ${identifier}`}
      >
        {getIcon()}
        <span>{fullMatch.slice(1, -1)}</span>
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Trailing text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

/**
 * Lightweight, zero-dependency Markdown renderer for Séance responses and Resurrection reports.
 */
export default function MarkdownViewer({ content, onCitationClick, className = "" }) {
  if (!content) return null;

  const lines = content.split("\n");
  const rendered = [];
  let inCodeBlock = false;
  let codeBlockLines = [];
  let currentList = [];
  let listType = null; // 'ul' or 'ol'

  const flushList = (key) => {
    if (currentList.length > 0) {
      if (listType === "ol") {
        rendered.push(
          <ol key={`ol-${key}`} style={{ marginLeft: 24, marginBottom: 16 }}>
            {currentList.map((li, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {renderInlineWithCitations(li, onCitationClick)}
              </li>
            ))}
          </ol>
        );
      } else {
        rendered.push(
          <ul key={`ul-${key}`} style={{ marginLeft: 24, marginBottom: 16, listStyleType: "disc" }}>
            {currentList.map((li, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {renderInlineWithCitations(li, onCitationClick)}
              </li>
            ))}
          </ul>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((line, index) => {
    // Code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // Close code block
        rendered.push(
          <pre key={`code-${index}`} style={{ margin: "14px 0" }}>
            <code>{codeBlockLines.join("\n")}</code>
          </pre>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushList(index);
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***") {
      flushList(index);
      rendered.push(<hr key={`hr-${index}`} />);
      return;
    }

    // Headings
    if (line.startsWith("# ")) {
      flushList(index);
      rendered.push(
        <h1 key={index} style={{ fontSize: "1.4rem", fontWeight: 700, marginTop: 18, marginBottom: 10 }}>
          {line.replace("# ", "")}
        </h1>
      );
      return;
    }
    if (line.startsWith("## ")) {
      flushList(index);
      rendered.push(
        <h2 key={index} style={{ fontSize: "1.2rem", fontWeight: 600, marginTop: 16, marginBottom: 8, borderBottom: "1px solid var(--border-subtle)", paddingBottom: 4 }}>
          {line.replace("## ", "")}
        </h2>
      );
      return;
    }
    if (line.startsWith("### ")) {
      flushList(index);
      rendered.push(
        <h3 key={index} style={{ fontSize: "1.05rem", fontWeight: 600, marginTop: 14, marginBottom: 6, color: "var(--accent-primary)" }}>
          {line.replace("### ", "")}
        </h3>
      );
      return;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      flushList(index);
      rendered.push(
        <blockquote key={index}>
          {renderInlineWithCitations(line.replace("> ", ""), onCitationClick)}
        </blockquote>
      );
      return;
    }

    // Lists
    const unorderedMatch = line.match(/^\s*[-*]\s+(.+)/);
    if (unorderedMatch) {
      if (listType === "ol") flushList(index);
      listType = "ul";
      currentList.push(unorderedMatch[1]);
      return;
    }

    const orderedMatch = line.match(/^\s*(\d+)\.\s+(.+)/);
    if (orderedMatch) {
      if (listType === "ul") flushList(index);
      listType = "ol";
      currentList.push(orderedMatch[2]);
      return;
    }

    // Normal Paragraph
    if (line.trim().length > 0) {
      flushList(index);
      rendered.push(
        <p key={index} style={{ marginBottom: 12 }}>
          {renderInlineWithCitations(line, onCitationClick)}
        </p>
      );
    } else {
      flushList(index);
    }
  });

  flushList("final");

  return <div className={`markdown-content ${className}`}>{rendered}</div>;
}

